package middlewares

import (
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
)

type Middlewares interface {
	Cors() gin.HandlerFunc
	RateLimiter(rateStr LimitRate) gin.HandlerFunc
	Authentication(c *gin.Context)
	XSSProtection() gin.HandlerFunc
}

type MiddlewaresImpl struct {
	web.ResponseWriter
	userRepo user.UserRepo
}

type LimitRate string

const (
	TEN_PER_SECOND   LimitRate = "10-S"
	FIVE_PER_SECOND  LimitRate = "5-S"
	TEN_PER_MINUTE   LimitRate = "10-M"
	FIVE_PER_HOUR    LimitRate = "5-H"
	FIFTY_PER_SECOND LimitRate = "50-S"
)