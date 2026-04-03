package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv" // 👈 thêm
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// 👇 LOAD .env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	dsn := os.Getenv("DB_URL")

	fmt.Println("DB_URL:", dsn) // debug

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	DB = database
	fmt.Println("Connected to Supabase!")
}
