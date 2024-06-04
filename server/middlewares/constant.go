package middlewares

import (
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
)

type Middlewares interface {
	Cors() gin.HandlerFunc
	Authentication(c *gin.Context)
}

type MiddlewaresImpl struct {
	web.ResponseWriter
	userRepo user.UserRepo
}
