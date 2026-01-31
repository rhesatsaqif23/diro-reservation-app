package model

import "time"

type Court struct {
	ID        string    `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name      string    `gorm:"size:50;not null"`
	Type      *string   `gorm:"size:50"`
	IsActive  bool      `gorm:"default:true"`
	CreatedAt time.Time `gorm:"autoCreateTime"`

	Reservations []Reservation `gorm:"foreignKey:CourtID"`
}

func (Court) TableName() string {
	return "courts"
}
