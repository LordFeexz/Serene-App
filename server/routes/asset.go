package routes

import (
	"serene-app/controllers"
	"serene-app/middlewares"

	"github.com/gin-gonic/gin"
)

func (r *router) assetRoute(rg *gin.RouterGroup, asset controllers.AssetController, md middlewares.Middlewares) {
	rg.Group("/assets").
		GET("/emote", asset.GetAllEmote).
		GET("/emote/:name", asset.GetEmoteByName).
		Use(md.Authentication).
		GET("/therapy-video", asset.GetAllTherapyVideo).
		GET("/therapy-video/:v", asset.GetOneTheraphyVideo).
		GET("/sound", asset.GetAllSound).
		GET("/sound/:title", asset.GetOneSound)
}
