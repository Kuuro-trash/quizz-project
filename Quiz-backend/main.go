package main

import (
	"log"
	"quiz-backend/config"
	"quiz-backend/controllers"
	"quiz-backend/models"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.Default()

	// CAU HINH CORS CHO PHEP ANGULAR TAO REQUEST
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	config.ConnectDatabase()
	// Tu dong tao bang
	config.DB.AutoMigrate(&models.User{}, &models.Quiz{}, &models.Question{})

	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
		auth.POST("/google", controllers.GoogleLogin)
	}

	api := r.Group("/api")
	{
		api.POST("/quizzes", controllers.CreateQuiz)
		api.GET("/quizzes", controllers.GetQuizzes)
		api.GET("/quizzes/:id", controllers.GetQuiz)
	}

	r.Run(":8080")
}
