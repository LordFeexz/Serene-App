package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) testRoute(rg *gin.RouterGroup, test controllers.TestController, md middlewares.Middlewares) {
	rg.Group("/test").
		Use(md.Authentication).
		GET("/mental-health", md.RateLimiter(middlewares.TEN_PER_SECOND), test.GetMentalHealthQuestion).
		POST("/mental-health", test.MentalHealthResult)
}
