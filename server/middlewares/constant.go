package middlewares

import (
	"serene-app/web"

	"github.com/gin-gonic/gin"
)

type Middlewares interface {
	Cors() gin.HandlerFunc
}

type MiddlewaresImpl struct{ web.ResponseWriter }
