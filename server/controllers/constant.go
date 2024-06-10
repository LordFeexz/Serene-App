package controllers

import (
	"serene-app/pkg/history"
	"serene-app/pkg/mood"
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

type TestController interface {
	GetMentalHealthQuestion(c *gin.Context)
	MentalHealthResult(c *gin.Context)
}

type TestControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	userService user.UserService
	historyRepo history.HistoryRepo
}

type MoodController interface {
	GetListMood(c *gin.Context)
}

type MoodControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	userService user.UserService
	historyRepo history.HistoryRepo
	moodRepo    mood.MoodRepo
}

type AssetController interface {
	GetEmoteByName(c *gin.Context)
}

type AssetControllerImpl struct {
	web.ResponseWriter
	validate *validator.Validate
}
