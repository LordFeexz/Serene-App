package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) testRoute(rg *gin.RouterGroup, test controllers.TestController, md middlewares.Middlewares) {
	rg.Group("/test").
		Use(md.Authentication).
		GET("/mental-health", test.GetMentalHealthQuestion)
}
