package controllers

import (
	cons "serene-app/constants"
	h "serene-app/helpers"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewAssetRoute(w web.ResponseWriter, v *validator.Validate) AssetController {
	return &AssetControllerImpl{w, v}
}

func (ctr *AssetControllerImpl) GetEmoteByName(c *gin.Context) {
	filename, err := h.GetEmotImg(c.Param("name"))
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	c.File(filename)
}

func (ctr *AssetControllerImpl) GetAllTherapyVideo(c *gin.Context) {
	ctr.WriteResponse(c, 200, "OK", cons.THERAPY_VIDEOS)
}
