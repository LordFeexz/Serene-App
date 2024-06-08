package database

import (
	"database/sql"
	"log"
	"os"
	"serene-app/exceptions"

	_ "github.com/lib/pq"
)

func Conn() {
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		url = "user=apple password=password dbname=serene-app sslmode=disable"
	}

	db, err := sql.Open("postgres", url)
	exceptions.PanicIfError(err)
	exceptions.PanicIfError(db.Ping())

	DB = db
	log.Println("Connected to the database")
}
