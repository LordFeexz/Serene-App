package user

import (
	"fmt"
	h "serene-app/helpers"
	"serene-app/mail"

	"github.com/gin-gonic/gin"
)

func NewService(m mail.Mailer) UserService {
	return &UserServiceImpl{m}
}

func (s *UserServiceImpl) SendEmailVerification(data User) error {
	html, _ := mail.GetEmailVerif(fmt.Sprintf("%s/user/verify?token=%s",
		h.GetEnvOrDefault("BASE_URL", "http://localhost:3001/api/v1"),
		h.GenerateJwtToken(data.Id, data.Username, data.Email, data.IsVerified),
	))
	msg := mail.NewMessage("Email Verification", html, []string{data.Email})
	return s.mailer.Send(msg)
}

func (s *UserServiceImpl) GetUserFromRequestCtx(c *gin.Context) (data User) {
	//make sure u already put auth middleware
	ctx, ok := c.Get("user")
	if !ok {
		return
	}

	data, _ = ctx.(User)

	return
}
