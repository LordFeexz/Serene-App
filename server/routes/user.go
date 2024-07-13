package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) userRoute(rg *gin.RouterGroup, c controllers.UserController, md middlewares.Middlewares) {
	rg.Group("/user").
		GET("/", md.RateLimiter(middlewares.TEN_PER_SECOND), md.Authentication, c.Me).
		POST("/register", c.Register).
		POST("/login", md.RateLimiter(middlewares.TEN_PER_MINUTE), c.Login).
		POST("/resend-email", md.RateLimiter(middlewares.TEN_PER_MINUTE), c.ResendEmailVerification).
		GET("/verify", md.RateLimiter(middlewares.TEN_PER_MINUTE), c.VerifyPage("activated.html"))
}
