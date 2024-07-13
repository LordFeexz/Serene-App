package middlewares

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
	g "github.com/ulule/limiter/v3/drivers/middleware/gin"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func (m *MiddlewaresImpl) RateLimiter(rateStr LimitRate) gin.HandlerFunc {
	store := memory.NewStore()
	rate, err := limiter.NewRateFromFormatted(string(rateStr))
	if err != nil {
		log.Fatalf("invalid rate str")
	}

	return g.NewMiddleware(limiter.New(store, rate))
}
