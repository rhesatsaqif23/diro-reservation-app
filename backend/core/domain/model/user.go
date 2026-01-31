package model

import "time"

type User struct {
	ID           string    `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name         string    `gorm:"size:100;not null"`
	Email        string    `gorm:"size:100;not null;unique"`
	PasswordHash string    `gorm:"not null"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`

	Reservations []Reservation `gorm:"foreignKey:UserID"`
}

func (User) TableName() string {
	return "users"
}
