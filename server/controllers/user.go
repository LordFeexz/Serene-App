package controllers

import (
	"database/sql"
	"fmt"
	"os"
	"serene-app/exceptions"
	h "serene-app/helpers"
	"serene-app/mail"
	"serene-app/pkg/user"
	"serene-app/web"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewUserController(w web.ResponseWriter, v *validator.Validate, userRepo user.UserRepo, mailer mail.Mailer) UserController {
	return &UserControllerImpl{w, v, userRepo, mailer}
}

func (ctr *UserControllerImpl) Register(c *gin.Context) {
	var body web.UserRegisterProps
	c.ShouldBind(&body)

	if err := ctr.validate.Struct(&body); err != nil {
		ctr.WriteValidationErrResponse(c, err)
		return
	}

	rows, err := ctr.userRepo.GetDb().QueryContext(
		c.Request.Context(),
		h.LogQuery(fmt.Sprintf(`SELECT s.id, s.username, s.email, s.is_verified, s.created_at, s.updated_at FROM "%s" s WHERE s.username = $1 OR s.email = $2`, user.TABLE_NAME)),
		body.Username, body.Email,
	)
	if err != nil && err != sql.ErrNoRows {
		ctr.AbortResponse(c, err)
		return
	}

	for rows.Next() {
		var data user.User
		if err := rows.Scan(
			&data.Id, &data.Username, &data.Email, &data.IsVerified, &data.CreatedAt, &data.UpdatedAt,
		); err != nil {
			ctr.AbortResponse(c, err)
			return
		}

		if data.Email == body.Email {
			ctr.AbortResponse(c, exceptions.NewError("email is already registered", 409))
			return
		}

		if data.Username == body.Username {
			ctr.AbortResponse(c, exceptions.NewError("username is already registered", 409))
			return
		}
	}

	hashed, err := h.Hash(body.Password)
	if err != nil {
		ctr.AbortResponse(c, exceptions.NewError("Failed to hash password", 500))
		return
	}
	data := user.User{Username: body.Username, Email: body.Email, Password: hashed, CreatedAt: time.Now(), UpdatedAt: time.Now(), IsVerified: false}
	if err := ctr.userRepo.Create(c.Request.Context(), &data); err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	go func() {
		html, _ := mail.GetEmailVerif(
			fmt.Sprintf("%s/user/verify?token=%s",
				os.Getenv("APPLICATION_BASE_URL"),
				h.GenerateJwtToken(data.Id, data.Username, data.Email, data.IsVerified),
			))

		msg := mail.NewMessage("Email Verification", html, []string{data.Email})
		if err := ctr.mailer.Send(msg); err != nil {
			println(err.Error())
		}
	}()

	ctr.WriteResponse(c, 201, "success", data)
}

func (ctr *UserControllerImpl) Login(c *gin.Context) {
	var body web.UserLoginProps
	c.ShouldBind(&body)

	var data user.User
	if err := ctr.userRepo.GetDb().QueryRowContext(
		c.Request.Context(),
		h.LogQuery(
			fmt.Sprintf(`SELECT s.id, s.username, s.email, s.password, s.is_verified FROM "%s" s WHERE email = $1`, user.TABLE_NAME),
		),
		body.Email,
	).Scan(
		&data.Id, &data.Username, &data.Email, &data.Password, &data.IsVerified,
	); err != nil && err != sql.ErrNoRows {
		ctr.AbortResponse(c, err)
		return
	} else if err == sql.ErrNoRows {
		ctr.AbortResponse(c, exceptions.NewError("invalid credentials", 401))
		return
	}

	if !h.CompareHash(data.Password, body.Password) {
		ctr.AbortResponse(c, exceptions.NewError("invalid credentials", 401))
		return
	}

	if !data.IsVerified {
		ctr.AbortResponse(c, exceptions.NewError("your account is not verified", 401))
		return
	}

	ctr.WriteResponse(c, 200, "OK", h.GenerateJwtToken(data.Id, data.Username, data.Email, data.IsVerified))
}
