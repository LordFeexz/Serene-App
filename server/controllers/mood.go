package controllers

import (
	"database/sql"
	"fmt"
	cons "serene-app/constants"
	"serene-app/exceptions"
	h "serene-app/helpers"
	"serene-app/pkg/history"
	"serene-app/pkg/mood"
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewMoodController(
	w web.ResponseWriter,
	v *validator.Validate,
	userService user.UserService,
	historyRepo history.HistoryRepo,
	moodRepo mood.MoodRepo,
) MoodController {
	return &MoodControllerImpl{w, v, userService, historyRepo, moodRepo}
}

func (ctr *MoodControllerImpl) GetListMood(c *gin.Context) {
	rows, err := ctr.moodRepo.GetDb().QueryContext(
		c.Request.Context(),
		h.LogQuery(fmt.Sprintf("SELECT id, name, created_at, updated_at FROM %s", mood.TABLE_NAME)),
	)
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}
	defer rows.Close()

	datas := make([]map[string]any, 0)
	baseUrl := h.GetEnvOrDefault("BASE_URL", "http://localhost:3001/api/v1") + "/assets/emote"
	for rows.Next() {
		var data mood.Mood
		if err := rows.Scan(
			&data.Id, &data.Name, &data.CreatedAt, &data.UpdatedAt,
		); err != nil && err != sql.ErrNoRows {
			ctr.AbortResponse(c, err)
			return
		} else if err == sql.ErrNoRows {
			ctr.AbortResponse(c, exceptions.NewError("data tidak ditemukan", 404))
			return
		}

		datas = append(datas, map[string]any{
			"id":         data.Id,
			"name":       data.Name,
			"image_url":  baseUrl + "/" + cons.EMOTENAMEMAP[data.Name],
			"created_at": data.CreatedAt,
			"updated_at": data.UpdatedAt,
		})
	}

	ctr.WriteResponse(c, 200, "OK", datas)
}
