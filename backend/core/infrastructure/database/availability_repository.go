package database

import (
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
	"gorm.io/gorm"
)

// Mengambil reservation yang sudah membooking court
type AvailabilityRepository interface {
	GetReservedSlots(courtID string, date time.Time) ([]model.Reservation, error)
}

type availabilityRepository struct {
	db *gorm.DB
}

func NewAvailabilityRepository(db *gorm.DB) AvailabilityRepository {
	return &availabilityRepository{db: db}
}

// Mengambil reservation dengan status PAID atau PENDING (mengunci slot)
func (r *availabilityRepository) GetReservedSlots(
	courtID string,
	date time.Time,
) ([]model.Reservation, error) {

	var reservations []model.Reservation

	err := r.db.
		Where(
			"court_id = ? AND date = ? AND status IN ?",
			courtID,
			date,
			[]model.ReservationStatus{
				model.ReservationPending,
				model.ReservationPaid,
			},
		).
		Find(&reservations).Error

	return reservations, err
}
