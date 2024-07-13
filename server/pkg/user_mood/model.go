package usermood

import "time"

type UserMood struct {
	Id        int64     `db:"id" json:"id"`
	UserId    string    `db:"user_id" json:"user_id"`
	MoodId    int64     `db:"mood_id" json:"mood_id"`
	Date      time.Time `db:"date" json:"date"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
