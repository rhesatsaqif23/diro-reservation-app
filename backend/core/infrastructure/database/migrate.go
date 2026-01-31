package database

import (
	"log"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&model.User{},
		&model.Class{},
		&model.Court{},
		&model.Reservation{},
		&model.Payment{},
	)
	if err != nil {
		log.Fatalf("Auto migration failed: %v", err)
	}

	log.Println("Database migrated successfully")
}
