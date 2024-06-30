package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) moodRoute(rg *gin.RouterGroup, mood controllers.MoodController, md middlewares.Middlewares) {
	rg.Group("/mood").
		Use(md.Authentication).
		GET("/", md.RateLimiter(middlewares.TEN_PER_SECOND), mood.GetListMood).
		GET("/me", md.RateLimiter(middlewares.FIVE_PER_SECOND), mood.GetMyMood).
		GET("/me/:date", md.RateLimiter(middlewares.TEN_PER_SECOND), mood.GetMyMoodByDate).
		POST("/", mood.AddTodayMood)
}
