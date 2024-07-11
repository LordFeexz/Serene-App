package controllers

import (
	"serene-app/libs"
	"serene-app/pkg/history"
	"serene-app/pkg/mood"
	"serene-app/pkg/user"
	usermood "serene-app/pkg/user_mood"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type UserController interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	ResendEmailVerification(c *gin.Context)
	Me(c *gin.Context)
	Verify(c *gin.Context)
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
	AddTodayMood(c *gin.Context)
	GetMyMood(c *gin.Context)
	GetMyMoodByDate(c *gin.Context)
}

type MoodControllerImpl struct {
	web.ResponseWriter
	validate     *validator.Validate
	userService  user.UserService
	historyRepo  history.HistoryRepo
	moodRepo     mood.MoodRepo
	userMoodRepo usermood.UserMoodRepo
}

type AssetController interface {
	GetEmoteByName(c *gin.Context)
	GetAllTherapyVideo(c *gin.Context)
	GetOneTheraphyVideo(c *gin.Context)
	GetAllSound(c *gin.Context)
	GetOneSound(c *gin.Context)
	GetAllEmote(c *gin.Context)
	GetPdf(c *gin.Context)
}

type AssetControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	historyRepo history.HistoryRepo
	userService user.UserService
}

type LocationController interface {
	NearByClinic(c *gin.Context)
}

type LocationControllerImpl struct {
	web.ResponseWriter
	validate    *validator.Validate
	gmaps       libs.Gmaps
	historyRepo history.HistoryRepo
	userService user.UserService
}
