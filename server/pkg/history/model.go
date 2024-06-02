package history

import "time"

type History struct {
	Id          int64     `db:"id"`
	FeatureUser string    `db:"feature_used"`
	UserId      string    `db:"user_id"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}
