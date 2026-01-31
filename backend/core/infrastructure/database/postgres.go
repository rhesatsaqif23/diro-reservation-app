package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitDB(cfg *config.Config) (*gorm.DB, error) {
	// Prioritize DATABASE_URL from env (Vercel standard), fallback to config struct (Local)
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Jakarta",
			cfg.Database.Host, cfg.Database.User, cfg.Database.Password, cfg.Database.DBName, cfg.Database.Port, cfg.Database.SSLMode,
		)
	}

	// Set GORM logger
	gormConfig := &gorm.Config{Logger: logger.Default.LogMode(logger.Error)}
	if cfg.Server.Env == "development" {
		gormConfig.Logger = logger.Default.LogMode(logger.Info)
	}

	// Connect to database
	db, err := gorm.Open(postgres.Open(dsn), gormConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Get underlying SQL DB for connection pool settings
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	// Serverless Optimization: Strict limits to prevent connection exhaustion
	sqlDB.SetMaxOpenConns(1)                  // Limit to 1 connection per function instance
	sqlDB.SetMaxIdleConns(1)                  // Keep max 1 idle connection
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // Recycle connections frequently

	// Test connection
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("✓ Database connected (Serverless Optimized)")

	return db, nil
}
