package main

import (
	"log"
	"os"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/config"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/infrastructure/database"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	db, err := database.InitDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("✓ Database connected successfully!")

	// Initialize router
	router := http.NewRouter(db, cfg)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server starting on http://localhost:%s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
