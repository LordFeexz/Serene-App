package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func NewRoutes(
	md middlewares.Middlewares,
	user controllers.UserController,
) func(addr ...string) error {
	r := router{gin.Default()}
	r.Use(gin.Recovery())

	groupRoutes := r.Group("/api/v1")
	r.userRoute(groupRoutes, user)

	return r.Run
}
