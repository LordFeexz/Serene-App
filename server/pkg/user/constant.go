package user

import (
	"context"
	"database/sql"
)

type UserRepo interface {
	GetDb() *sql.DB
	Create(ctx context.Context, data *User) error
}

type UserRepoImpl struct{ *sql.DB }

const (
	TABLE_NAME = "User"
)
