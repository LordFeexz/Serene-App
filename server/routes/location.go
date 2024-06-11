package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) locationRoute(rg *gin.RouterGroup, location controllers.LocationController, md middlewares.Middlewares) {
	rg.Group("/location").
		Use(md.Authentication).
		GET("/clinic", location.NearByClinic)
}
