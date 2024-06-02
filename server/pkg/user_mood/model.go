package usermood

import "time"

type UserMood struct {
	Id        int64     `db:"id"`
	UserId    string    `db:"user_id"`
	MoodId    int64     `db:"mood_id"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}
