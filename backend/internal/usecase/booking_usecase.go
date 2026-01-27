package usecase

import (
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
)

type BookingUsecase interface {
	GetAvailableDates() []string

	GetAvailableTimeslots(
		classID string,
		date time.Time,
	) ([]model.TimeslotAvailability, error)

	GetAvailableCourts(
		classID string,
		date time.Time,
		startTime string,
	) ([]model.Court, error)

	CreateDraft(
		userID string,
		classID string,
		courtID string,
		date time.Time,
		startTime string,
	) (*model.Reservation, error)

	GetSummary(id string) (*model.Reservation, error)
}
