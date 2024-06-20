package middlewares

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
	g "github.com/ulule/limiter/v3/drivers/middleware/gin"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func init() {
	store = memory.NewStore()

	defineLimiter(TEN_PER_MINUTE)
	defineLimiter(FIVE_PER_SECOND)
	defineLimiter(TEN_PER_SECOND)
	defineLimiter(FIVE_PER_HOUR)
}

func defineLimiter(rateStr LimitRate) {
	rate, err := limiter.NewRateFromFormatted(string(rateStr))
	if err != nil {
		log.Fatalf("invalid rate str")
	}

	rateLimiters[rateStr] = limiter.New(store, rate)
}

func (m *MiddlewaresImpl) RateLimiter(rateStr LimitRate) gin.HandlerFunc {
	limiterInstance, exists := rateLimiters[rateStr]
	if !exists {
		return func(c *gin.Context) {
			c.Next()
		}
	}

	return g.NewMiddleware(limiterInstance)
}
