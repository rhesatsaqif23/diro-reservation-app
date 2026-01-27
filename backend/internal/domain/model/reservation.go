package model

import "time"

type ReservationStatus string

const (
	ReservationPending   ReservationStatus = "PENDING"
	ReservationPaid      ReservationStatus = "PAID"
	ReservationCancelled ReservationStatus = "CANCELLED"
)

type Reservation struct {
	ID        string            `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserID    string            `json:"user_id" gorm:"type:uuid;not null"`
	ClassID   string            `json:"class_id" gorm:"type:uuid;not null"`
	CourtID   string            `json:"court_id" gorm:"type:uuid;not null"`
	Date      time.Time         `json:"date" gorm:"type:date;not null"`
	StartTime string            `json:"start_time" gorm:"type:time;not null"`
	Status    ReservationStatus `json:"status" gorm:"type:reservation_status;default:PENDING"`
	CreatedAt time.Time         `json:"created_at" gorm:"autoCreateTime"`

	User  User  `json:"user" gorm:"foreignKey:UserID"`
	Class Class `json:"class" gorm:"foreignKey:ClassID"`
	Court Court `json:"court" gorm:"foreignKey:CourtID"`
}

func (Reservation) TableName() string {
	return "reservations"
}
