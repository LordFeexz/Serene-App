package routes

import (
	"serene-app/controllers"

	"github.com/gin-gonic/gin"
)

func (r *router) assetRoute(rg *gin.RouterGroup, asset controllers.AssetController) {
	rg.Group("/assets").
		GET("/emote/:name", asset.GetEmoteByName)
}
