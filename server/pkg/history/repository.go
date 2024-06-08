package history

import (
	"database/sql"
	"serene-app/database"
)

func NewHistoryRepo() HistoryRepo {
	return &HistoryRepoImpl{database.DB}
}

func (r *HistoryRepoImpl) GetDb() *sql.DB {
	return r.DB
}
