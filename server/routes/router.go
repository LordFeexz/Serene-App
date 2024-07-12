package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func NewRoutes(
	md middlewares.Middlewares,
	user controllers.UserController,
	history controllers.HistoryController,
	test controllers.TestController,
	asset controllers.AssetController,
	mood controllers.MoodController,
	location controllers.LocationController,
) func(addr ...string) error {
	r := router{gin.Default()}
	r.Use(gin.Recovery())
	r.LoadHTMLGlob("mail/assets/*")
	r.Use(md.Cors())
	r.Use(md.RateLimiter(middlewares.FIFTY_PER_SECOND))
	r.Use(md.XSSProtection())

	r.GET("/ping", md.RateLimiter(middlewares.FIVE_PER_HOUR), func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	groupRoutes := r.Group("/api/v1")
	r.userRoute(groupRoutes, user, md)
	r.historyRoute(groupRoutes, history, md)
	r.testRoute(groupRoutes, test, md)
	r.assetRoute(groupRoutes, asset)
	r.moodRoute(groupRoutes, mood, md)
	r.locationRoute(groupRoutes, location, md)

	return r.Run
}
