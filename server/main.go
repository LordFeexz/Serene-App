package main

import (
	"log"
	"os"
	"serene-app/controllers"
	"serene-app/database"
	"serene-app/exceptions"
	"serene-app/mail"
	"serene-app/middlewares"
	"serene-app/pkg/user"
	"serene-app/routes"
	"serene-app/validator"
	"serene-app/web"

	"github.com/joho/godotenv"
)

func main() {
	exceptions.PanicIfError(godotenv.Load())
	database.Conn()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	validate := validator.New()
	w := web.NewResponseWriter()
	mailer := mail.NewSender()
	md := middlewares.New()

	userRepo := user.NewRepo()

	userController := controllers.NewUserController(w, validate, userRepo, mailer)

	log.Printf("starting application on port %s", port)
	if err := routes.NewRoutes(md, userController)(":" + port); err != nil {
		log.Fatalf("application failed to start : %s", err.Error())
	}
}
