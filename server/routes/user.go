package routes

import (
	"serene-app/controllers"

	"github.com/gin-gonic/gin"
)

func (r *router) userRoute(rg *gin.RouterGroup, c controllers.UserController) {
	rg.Group("/user").POST("/register", c.Register).POST("/login", c.Login)
}
