package middlewares

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (m *MiddlewaresImpl) Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Length", "Content-Type"},
		MaxAge:          time.Hour * 12,
		AllowAllOrigins: true,
	},
	)
}
