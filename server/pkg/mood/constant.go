package mood

import "database/sql"

type MoodRepo interface {
	GetDb() *sql.DB
}

type MoodRepoImpl struct{ *sql.DB }

const (
	TABLE_NAME = "mood"
)
