package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) historyRoute(rg *gin.RouterGroup, c controllers.HistoryController, md middlewares.Middlewares) {
	rg.Group("/history").
		Use(md.Authentication).
		GET("/", c.GetMyHistory)
}
