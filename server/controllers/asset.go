package controllers

import (
	"context"
	"fmt"
	cons "serene-app/constants"
	h "serene-app/helpers"
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

//TODO : create docs for new endpoint

func NewAssetRoute(
	w web.ResponseWriter,
	v *validator.Validate,
	historyRepo history.HistoryRepo,
	userService user.UserService,
) AssetController {
	return &AssetControllerImpl{w, v, historyRepo, userService}
}

func (ctr *AssetControllerImpl) GetAllEmote(c *gin.Context) {
	baseUrl := h.GetEnvOrDefault("BASE_URL", "http://localhost:3001/api/v1") + "/assets/emote"
	datas := make([]map[string]any, 0)

	for key := range cons.EMOTENAMEMAP {
		datas = append(datas, map[string]any{
			"name":      key,
			"image_url": baseUrl + "/" + cons.EMOTENAMEMAP[key],
		})
	}

	ctr.WriteResponse(c, 200, "OK", datas)
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

func (ctr *AssetControllerImpl) GetAllSound(c *gin.Context) {
	baseUrl := h.GetEnvOrDefault("BASE_URL", "http://localhost:3001/api/v1") + "/assets/sound"
	datas := make([]map[string]any, 0)

	for key := range cons.SOUND {
		datas = append(datas, map[string]any{
			"name": key,
			"url":  baseUrl + "/" + key,
		})
	}

	ctr.WriteResponse(c, 200, "OK", datas)
}

func (ctr *AssetControllerImpl) GetOneSound(c *gin.Context) {
	title := c.Param("title")
	sound, err := h.FindOneSound(title)
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	go func() {
		now := time.Now()
		ctr.historyRepo.Create(context.Background(), &history.History{
			FeatureUsed: history.GET_SOUND_THERAPY,
			Description: fmt.Sprintf("membuka audio %s pada %d-%02d-%02d pukul %02d:%02d", strings.ReplaceAll(title, "-", " "), now.Year(), now.Month(), now.Day(), now.Hour(), now.Minute()),
			UserId:      ctr.userService.GetUserFromRequestCtx(c).Id,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}()
	c.File(sound)
}

func (ctr *AssetControllerImpl) GetPdf(c *gin.Context) {
	file, err := h.GetPdf()
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	go func() {
		now := time.Now()
		ctr.historyRepo.Create(context.Background(), &history.History{
			FeatureUsed: history.DOWNLOAD_PDF,
			Description: fmt.Sprintf("mendownload buku saku pada %d-%02d-%02d pukul %02d:%02d", now.Year(), now.Month(), now.Day(), now.Hour(), now.Minute()),
			UserId:      ctr.userService.GetUserFromRequestCtx(c).Id,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}()
	c.File(file)
}
