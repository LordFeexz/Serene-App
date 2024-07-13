package controllers

import (
	"context"
	"serene-app/libs"
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewLocationController(
	w web.ResponseWriter,
	v *validator.Validate,
	gmaps libs.Gmaps,
	historyRepo history.HistoryRepo,
	userService user.UserService,
) LocationController {
	return &LocationControllerImpl{w, v, gmaps, historyRepo, userService}
}

func (ctr *LocationControllerImpl) NearByClinic(c *gin.Context) {
	var query web.LocationQuery
	c.ShouldBindQuery(&query)

	if err := ctr.validate.Struct(&query); err != nil {
		ctr.WriteValidationErrResponse(c, err)
		return
	}

	if err := query.ValidateRadius(); err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	clinics, nextPageToken, err := ctr.gmaps.NearbyClinic(
		c.Request.Context(),
		query.Latitude,
		query.Longitude,
		query.Radius,
		query.PageToken,
	)
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}

	go func() {
		now := time.Now()
		ctr.historyRepo.Create(context.Background(), &history.History{
			FeatureUsed: history.GET_NEARBY_CLINIC,
			Description: "mencari klinik terdekat",
			UserId:      ctr.userService.GetUserFromRequestCtx(c).Id,
			CreatedAt:   now,
			UpdatedAt:   now,
		})
	}()

	ctr.WriteResponse(c, 200, "OK", map[string]any{
		"clinics":         clinics,
		"next_page_token": nextPageToken,
	})
}
