package controllers

import (
	"context"
	"fmt"
	cons "serene-app/constants"
	h "serene-app/helpers"
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewAssetRoute(
	w web.ResponseWriter,
	v *validator.Validate,
	historyRepo history.HistoryRepo,
	userService user.UserService,
) AssetController {
	return &AssetControllerImpl{w, v, historyRepo, userService}
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

func (ctr *AssetControllerImpl) GetOneTheraphyVideo(c *gin.Context) {
	video, err := h.FindOneTherapyVideo(c.Param("v"))
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	go func() {
		now := time.Now()
		ctr.historyRepo.Create(context.Background(), &history.History{
			FeatureUsed: history.GET_VIDEO_THERAPY,
			Description: fmt.Sprintf("membuka video relaksasi %s pada %d-%02d-%02d pukul %02d:%02d", video.Title, now.Year(), now.Month(), now.Day(), now.Hour(), now.Minute()),
			UserId:      ctr.userService.GetUserFromRequestCtx(c).Id,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}()
	ctr.WriteResponse(c, 200, "OK", video)
}
