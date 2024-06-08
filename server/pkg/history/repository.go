package history

import (
	"context"
	"database/sql"
	"fmt"
	"serene-app/database"
	h "serene-app/helpers"
)

func NewHistoryRepo() HistoryRepo {
	return &HistoryRepoImpl{database.DB}
}

func (r *HistoryRepoImpl) GetDb() *sql.DB {
	return r.DB
}

func (r *HistoryRepoImpl) Create(ctx context.Context, data *History) error {
	return r.QueryRowContext(
		ctx,
		h.LogQuery(
			fmt.Sprintf(`
			INSERT INTO %s 
			(feature_used, user_id, description, created_at, updated_at) 
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id
			`, TABLE_NAME),
		),
		&data.FeatureUsed, &data.UserId, &data.Description, &data.CreatedAt, &data.UpdatedAt,
	).Scan(&data.Id)
}
