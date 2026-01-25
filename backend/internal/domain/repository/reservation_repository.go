package repository

import (
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
)

// Contract database reservation
type ReservationRepository interface {
	Create(reservation *model.Reservation) error
	FindByUserID(userID string) ([]model.Reservation, error)
	IsSlotReserved(courtID string, date time.Time, startTime string) (bool, error)
	FindByIDWithPreload(id string) (*model.Reservation, error)
}
