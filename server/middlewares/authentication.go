package middlewares

import (
	"fmt"
	"serene-app/exceptions"
	h "serene-app/helpers"
	"serene-app/pkg/user"

	"github.com/gin-gonic/gin"
)

func (m *MiddlewaresImpl) Authentication(c *gin.Context) {
	token := c.Request.Header.Get("authorization")
	if token == "" {
		m.AbortResponse(c, exceptions.NewError("missing or invalid token", 401))
		return
	}

	payload, err := h.VerifyToken(token)
	if err != nil {
		m.AbortResponse(c, exceptions.NewError("missing or invalid token", 401))
		return
	}

	id, ok := payload["id"].(string)
	if !ok {
		m.AbortResponse(c, exceptions.NewError("missing or invalid token", 401))
		return
	}

	var userData user.User
	if err := m.userRepo.GetDb().QueryRowContext(
		c.Request.Context(),
		h.LogQuery(
			fmt.Sprintf(`SELECT id, username, email, is_verified, created_at, updated_at FROM "%s" WHERE id = $1`, user.TABLE_NAME)), id).
		Scan(
			&userData.Id, &userData.Username, &userData.Email, &userData.IsVerified, &userData.CreatedAt, &userData.UpdatedAt,
		); err != nil {
		m.AbortResponse(c, exceptions.NewError("missing or invalid token", 401))
		return
	}

	c.Set("user", userData)
	c.Next()
}
