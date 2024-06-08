package history

import "time"

type History struct {
	Id          int64     `db:"id" json:"id"`
	FeatureUsed feature   `db:"feature_used" json:"feature_used"`
	Description string    `db:"description" json:"description"`
	UserId      string    `db:"user_id" json:"user_id"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}
