package user

import (
	"context"
	"database/sql"
	"serene-app/mail"

	"github.com/gin-gonic/gin"
)

type UserRepo interface {
	GetDb() *sql.DB
	Create(ctx context.Context, data *User) error
}

type UserRepoImpl struct{ *sql.DB }

type UserService interface {
	SendEmailVerification(data User) error
	GetUserFromRequestCtx(c *gin.Context) User
}

type UserServiceImpl struct{ mailer mail.Mailer }

const (
	TABLE_NAME = "User"
)
