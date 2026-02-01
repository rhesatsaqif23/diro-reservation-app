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
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Jakarta",
			cfg.Database.Host, cfg.Database.User, cfg.Database.Password, cfg.Database.DBName, cfg.Database.Port, cfg.Database.SSLMode,
		)
	}

	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
		// 1. Matikan cache internal GORM (Double check)
		PrepareStmt: false,
	}

	if cfg.Server.Env == "development" {
		gormConfig.Logger = logger.Default.LogMode(logger.Info)
	}

	// 2. Gunakan postgres.New untuk konfigurasi yang lebih detail
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), gormConfig)

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	// Pool settings tetap diperlukan untuk Serverless
	sqlDB.SetMaxOpenConns(1)
	sqlDB.SetMaxIdleConns(1)
	sqlDB.SetConnMaxLifetime(1 * time.Minute) // Perkecil lifetime agar koneksi tidak menggantung

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("✓ Database connected (Simple Protocol & Serverless Optimized)")
	return db, nil
}
