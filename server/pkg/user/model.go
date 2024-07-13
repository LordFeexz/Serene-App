package user

import "time"

type User struct {
	Id         string    `db:"id" json:"id"`
	Username   string    `db:"username" json:"username"`
	Email      string    `db:"email" json:"email"`
	IsVerified bool      `db:"is_verified" json:"is_verified"`
	Password   string    `db:"password" json:"password"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
