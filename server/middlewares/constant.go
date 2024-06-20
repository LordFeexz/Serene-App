package middlewares

import (
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
)

type Middlewares interface {
	Cors() gin.HandlerFunc
	RateLimiter(rateStr LimitRate) gin.HandlerFunc
	Authentication(c *gin.Context)
}

type MiddlewaresImpl struct {
	web.ResponseWriter
	userRepo user.UserRepo
}

var (
	rateLimiters = make(map[LimitRate]*limiter.Limiter)
	store        limiter.Store
)

type LimitRate string

const (
	TEN_PER_SECOND  LimitRate = "10-S"
	FIVE_PER_SECOND LimitRate = "5-S"
	TEN_PER_MINUTE  LimitRate = "10-M"
	FIVE_PER_HOUR   LimitRate = "5-H"
)
