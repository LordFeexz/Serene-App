package controllers

import (
	"database/sql"
	"fmt"
	"serene-app/exceptions"
	h "serene-app/helpers"
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewHistoryController(w web.ResponseWriter, v *validator.Validate, userService user.UserService, historyRepo history.HistoryRepo) HistoryController {
	return &HistoryControllerImpl{w, v, userService, historyRepo}
}

func (ctr *HistoryControllerImpl) GetMyHistory(c *gin.Context) {
	var query web.DefaultPagination
	c.ShouldBindQuery(&query)
	query.SetDefault()

	rows, err := ctr.historyRepo.GetDb().QueryContext(
		c.Request.Context(),
		h.LogQuery(fmt.Sprintf(
			`
				SELECT id, feature_used, user_id, created_at, updated_at 
				FROM %s 
				WHERE user_id = $1
				ORDER BY %s %s
				Limit $2 OFFSET $3
				`, history.TABLE_NAME, history.ValidSortKey(query.SortBy), h.SortDirection(query.SortDirection)),
		),
		ctr.userService.GetUserFromRequestCtx(c).Id,
		query.Limit,
		(query.Page-1)*query.Limit,
	)
	if err != nil {
		ctr.AbortResponse(c, err)
		return
	}
	defer rows.Close()

	var datas []history.History
	for rows.Next() {
		var data history.History
		if err := rows.Scan(
			&data.Id, &data.FeatureUser, &data.UserId, &data.CreatedAt, &data.UpdatedAt,
		); err != nil && err != sql.ErrNoRows {
			ctr.AbortResponse(c, err)
			return
		}
		datas = append(datas, data)
	}

	if len(datas) < 1 {
		ctr.AbortResponse(c, exceptions.NewError("data not found", 404))
		return
	}

	ctr.WriteResponse(c, 200, "OK", datas)

}
