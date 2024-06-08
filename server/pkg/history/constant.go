package history

import "database/sql"

type HistoryRepo interface {
	GetDb() *sql.DB
}

type HistoryRepoImpl struct{ *sql.DB }

const (
	TABLE_NAME = "History"
)
