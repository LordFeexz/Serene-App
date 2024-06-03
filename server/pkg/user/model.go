package user

import "time"

type User struct {
	Id         string    `db:"id"`
	Username   string    `db:"username"`
	Email      string    `db:"email"`
	IsVerified bool      `db:"is_verified"`
	Password   string    `db:"password"`
	CreatedAt  time.Time `db:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"`
}
