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
	usermood "serene-app/pkg/user_mood"
	"serene-app/web"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewMoodController(
	w web.ResponseWriter,
	v *validator.Validate,
	userService user.UserService,
	historyRepo history.HistoryRepo,
	moodRepo mood.MoodRepo,
	userMoodRepo usermood.UserMoodRepo,
) MoodController {
	return &MoodControllerImpl{w, v, userService, historyRepo, moodRepo, userMoodRepo}
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

func (ctr *MoodControllerImpl) AddTodayMood(c *gin.Context) {
	var body web.AddTodayMoodProps
	c.ShouldBind(&body)

	if err := ctr.validate.Struct(&body); err != nil {
		ctr.WriteValidationErrResponse(c, err)
		return
	}

	var date time.Time
	now := time.Now()
	if body.Date == "" {
		date = now
	} else {
		parsed, err := h.ParseStrToDate(body.Date)
		if err != nil {
			ctr.AbortResponse(c, err)
			return
		}
		date = parsed
	}

	if h.IsAfter(date, h.EndOfDay(now)) {
		ctr.AbortResponse(c, exceptions.NewError("tidak bisa melebihi tanggal hari ini", 400))
		return
	}

	tx, err := ctr.userMoodRepo.GetDb().BeginTx(c.Request.Context(), nil)
	if err != nil {
		tx.Rollback()
		ctr.AbortResponse(c, exceptions.NewError("gagal membuka transaksi", 500))
		return
	}

	id := ctr.userService.GetUserFromRequestCtx(c).Id
	rows, err := tx.QueryContext(
		c.Request.Context(),
		h.LogQuery(
			fmt.Sprintf(
				`SELECT id, user_id, mood_id, date, created_at, updated_at FROM %s WHERE (date BETWEEN $1 AND $2) AND user_id = $3 FOR UPDATE`, usermood.TABLE_NAME,
			),
		),
		h.StartOfDay(date), h.EndOfDay(date), id,
	)
	if err != nil {
		tx.Rollback()
		ctr.AbortResponse(c, err)
		return
	}
	defer rows.Close()

	if rows.Next() {
		tx.Rollback()
		ctr.AbortResponse(
			c,
			exceptions.NewError(
				fmt.Sprintf(
					"kamu sudah menambahkan mood untuk tanggal %d-%02d-%02d", date.Year(), date.Month(), date.Day(),
				),
				409,
			),
		)
		return
	}

	var moodData mood.Mood
	if err := tx.QueryRow(
		h.LogQuery(
			fmt.Sprintf("SELECT id, name FROM %s WHERE name = $1 FOR UPDATE", mood.TABLE_NAME),
		),
		body.MoodName,
	).Scan(
		&moodData.Id, &moodData.Name,
	); err != nil && err != sql.ErrNoRows {
		tx.Rollback()
		ctr.AbortResponse(c, err)
		return
	} else if err == sql.ErrNoRows {
		tx.Rollback()
		ctr.AbortResponse(c, exceptions.NewError("data mood tidak ditemukan", 404))
		return
	}

	data := usermood.UserMood{UserId: id, CreatedAt: now, UpdatedAt: now, MoodId: moodData.Id, Date: date}
	if err := ctr.userMoodRepo.Create(tx, &data); err != nil {
		tx.Rollback()
		ctr.AbortResponse(c, err)
		return
	}

	if err := ctr.historyRepo.CreateWithTx(tx, &history.History{
		FeatureUsed: history.ADD_MOOD,
		Description: fmt.Sprintf("menambahkan mood %s pada %d-%02d-%02d", moodData.Name, date.Year(), date.Month(), date.Day()),
		UserId:      id,
		CreatedAt:   now,
		UpdatedAt:   now,
	}); err != nil {
		tx.Rollback()
		ctr.AbortResponse(c, err)
		return
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		ctr.AbortResponse(c, exceptions.NewError("gagal menutup transaksi", 500))
		return
	}

	ctr.WriteResponse(c, 201, "Success", data)
}
func (ctr *MoodControllerImpl) GetMyMood(c *gin.Context) {
	var query web.UserMoodQuery
	c.ShouldBindQuery(&query)
	query.Default()

	date := time.Date(int(query.Year), time.Month(query.Month), 1, 0, 0, 0, 0, time.Local)
	endOfMonth := h.EndOfMonth(date)

	rows, err := ctr.userMoodRepo.GetDb().QueryContext(
		c.Request.Context(),
		h.LogQuery(
			fmt.Sprintf(`
			SELECT 
			um.id, um.user_id, um.mood_id, um.date, um.created_at, um.updated_at, m.name as mood_name
			FROM %s um
			LEFT JOIN %s m ON um.mood_id = m.id
			WHERE um.user_id = $1 AND ( um.created_at BETWEEN $2 AND $3 )
			`, usermood.TABLE_NAME, mood.TABLE_NAME),
		),
		ctr.userService.GetUserFromRequestCtx(c).Id,
		h.StartOfMonth(date),
		endOfMonth,
	)
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}
	defer rows.Close()

	datas := make(map[string]map[string]interface{})
	baseUrl := h.GetEnvOrDefault("BASE_URL", "http://localhost:3001/api/v1") + "/assets/emote"
	for rows.Next() {
		var id, userId, moodId, createdAt, UpdatedAt, name any
		var date time.Time
		if err := rows.Scan(
			&id,
			&userId,
			&moodId,
			&date,
			&createdAt,
			&UpdatedAt,
			&name,
		); err != nil {
			ctr.AbortResponse(c, err)
			return
		}
		datas[date.Format("2006-01-02")] = map[string]any{
			"id":         id,
			"user_id":    userId,
			"mood_id":    moodId,
			"date":       date,
			"created_at": createdAt,
			"updated_at": UpdatedAt,
			"name":       name,
			"image_url":  baseUrl + "/" + cons.EMOTENAMEMAP[name.(string)],
		}
	}

	var results []map[string]any
	for i := 1; i <= endOfMonth.Day(); i++ {
		currentDate := time.Date(int(query.Year), time.Month(query.Month), i, 0, 0, 0, 0, time.Local)
		dateStr := currentDate.Format("2006-01-02")
		if data, exists := datas[dateStr]; exists {
			results = append(results, data)
		} else {
			results = append(results, map[string]any{
				"id":         nil,
				"user_id":    nil,
				"mood_id":    nil,
				"date":       dateStr,
				"name":       nil,
				"image_url":  nil,
				"created_at": nil,
				"updated_at": nil,
			})
		}
	}

	ctr.WriteResponse(c, 200, "OK", results)
}
