package controllers

import (
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type UserController interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	ResendEmailVerification(c *gin.Context)
	Me(c *gin.Context)
}

type UserControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	userRepo    user.UserRepo
	userService user.UserService
}

type HistoryController interface {
	GetMyHistory(c *gin.Context)
}

type HistoryControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	userService user.UserService
	historyRepo history.HistoryRepo
}
