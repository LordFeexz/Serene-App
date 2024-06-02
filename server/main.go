package main

import (
	"log"
	"os"
	"serene-app/database"
	"serene-app/exceptions"
	"serene-app/routes"

	"github.com/joho/godotenv"
)

func main() {
	exceptions.PanicIfError(godotenv.Load())
	database.Conn()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("starting application on port %s", port)
	if err := routes.NewRoutes()(":" + port); err != nil {
		log.Fatalf("application failed to start : %s", err.Error())
	}
}
