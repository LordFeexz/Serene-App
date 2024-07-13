package usermood

import "database/sql"

type UserMoodRepo interface {
	GetDb() *sql.DB
	Create(tx *sql.Tx, data *UserMood) error
}

type UserMoodRepoImpl struct{ *sql.DB }

const (
	TABLE_NAME = "usermood"
)
