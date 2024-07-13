package usermood

import (
	"database/sql"
	"fmt"
	"serene-app/database"
	h "serene-app/helpers"
)

func NewUserMoodRepo() UserMoodRepo {
	return &UserMoodRepoImpl{database.DB}
}

func (r *UserMoodRepoImpl) GetDb() *sql.DB {
	return r.DB
}

func (r *UserMoodRepoImpl) Create(tx *sql.Tx, data *UserMood) error {
	return tx.QueryRow(
		h.LogQuery(
			fmt.Sprintf(
				"INSERT INTO %s (user_id, mood_id, date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id", TABLE_NAME,
			),
		),
		data.UserId, data.MoodId, data.Date, data.CreatedAt, data.UpdatedAt).
		Scan(&data.Id)

}
