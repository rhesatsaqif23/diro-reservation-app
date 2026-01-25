package model

import "time"

type ReservationStatus string

const (
	ReservationPending   ReservationStatus = "PENDING"
	ReservationPaid      ReservationStatus = "PAID"
	ReservationCancelled ReservationStatus = "CANCELLED"
)

type Reservation struct {
	ID        string            `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserID    string            `gorm:"type:uuid;not null"`
	ClassID   string            `gorm:"type:uuid;not null"`
	CourtID   string            `gorm:"type:uuid;not null"`
	Date      time.Time         `gorm:"type:date;not null"`
	StartTime string            `gorm:"type:time;not null"`
	Status    ReservationStatus `gorm:"type:reservation_status;default:PENDING"`
	CreatedAt time.Time         `gorm:"autoCreateTime"`

	User  User  `gorm:"foreignKey:UserID"`
	Class Class `gorm:"foreignKey:ClassID"`
	Court Court `gorm:"foreignKey:CourtID"`
}

func (Reservation) TableName() string {
	return "reservations"
}
