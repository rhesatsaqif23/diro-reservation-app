package model

import "time"

type PaymentStatus string

const (
	PaymentPending PaymentStatus = "PENDING"
	PaymentSuccess PaymentStatus = "SUCCESS"
	PaymentFailed  PaymentStatus = "FAILED"
)

type Payment struct {
	ID            string        `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	ReservationID string        `gorm:"type:uuid;not null"`
	Provider      string        `gorm:"size:50;not null"`
	Amount        int           `gorm:"not null"`
	Status        PaymentStatus `gorm:"type:payment_status;not null"`
	TransactionID *string       `gorm:"size:100"`
	CreatedAt     time.Time     `gorm:"autoCreateTime"`

	Reservation Reservation `gorm:"foreignKey:ReservationID"`
}

func (Payment) TableName() string {
	return "payments"
}
