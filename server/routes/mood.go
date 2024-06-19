package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) moodRoute(rg *gin.RouterGroup, mood controllers.MoodController, md middlewares.Middlewares) {
	rg.Group("/mood").
		Use(md.Authentication).
		GET("/", mood.GetListMood).
		GET("/me", mood.GetMyMood).
		POST("/", mood.AddTodayMood)
}
