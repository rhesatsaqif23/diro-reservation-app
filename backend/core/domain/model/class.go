package model

import "time"

type Class struct {
	ID                string `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name              string `gorm:"size:100;not null"`
	DurationMinutes   int    `gorm:"not null"`
	Price             int    `gorm:"not null"`
	Description       *string
	RequiredCourtType string `gorm:"size:50;not null"`
	ImageURL          *string
	IsActive          bool      `gorm:"default:true"`
	CreatedAt         time.Time `gorm:"autoCreateTime"`

	Reservations []Reservation `gorm:"foreignKey:ClassID"`
}

func (Class) TableName() string {
	return "classes"
}
