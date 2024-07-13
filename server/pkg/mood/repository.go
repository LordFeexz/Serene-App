package mood

import (
	"database/sql"
	"serene-app/database"
)

func NewMoodRepo() MoodRepo {
	return &MoodRepoImpl{database.DB}
}

func (r *MoodRepoImpl) GetDb() *sql.DB {
	return r.DB
}
