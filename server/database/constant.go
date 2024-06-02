package database

import (
	"database/sql"
	"os"
)

var DB *sql.DB

// env
var (
	DATABASE_URL = os.Getenv("DATABASE_URL")
)
