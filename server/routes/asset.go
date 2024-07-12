package routes

import (
	"serene-app/controllers"

	"github.com/gin-gonic/gin"
)

func (r *router) assetRoute(rg *gin.RouterGroup, asset controllers.AssetController) {
	rg.Group("/assets").
		GET("/emote", asset.GetAllEmote).
		GET("/emote/:name", asset.GetEmoteByName).
		GET("/sound/thumbnail/:title", asset.GetSoundImage).
		GET("/sound", asset.GetAllSound).
		GET("/sound/:title", asset.GetOneSound).
		GET("/therapy-video", asset.GetAllTherapyVideo).
		GET("/therapy-video/:v", asset.GetOneTheraphyVideo).
		GET("/pdf", asset.GetPdf)
}
