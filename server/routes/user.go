package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) userRoute(rg *gin.RouterGroup, c controllers.UserController, md middlewares.Middlewares) {
	rg.Group("/user").
		GET("/", md.Authentication, c.Me).
		POST("/register", c.Register).
		POST("/login", c.Login).
		POST("/resend-email", c.ResendEmailVerification)
}
