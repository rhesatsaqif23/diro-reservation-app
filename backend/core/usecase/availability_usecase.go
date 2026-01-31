package usecase

import (
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
)

// Contract repository untuk availability
type AvailabilityRepository interface {
	GetReservedSlots(
		courtID string,
		date time.Time,
	) ([]model.Reservation, error)
}

// Business logic availability court
type AvailabilityUsecase interface {
	GetCourtAvailability(
		courtID string,
		date time.Time,
	) ([]model.TimeslotAvailability, error)
}

type availabilityUsecase struct {
	repo AvailabilityRepository
}

func NewAvailabilityUsecase(repo AvailabilityRepository) AvailabilityUsecase {
	return &availabilityUsecase{repo: repo}
}

// Mengembalikan list timeslot + status availability
func (u *availabilityUsecase) GetCourtAvailability(
	courtID string,
	date time.Time,
) ([]model.TimeslotAvailability, error) {

	// Default jam operasional (hardcoded dulu)
	timeslots := []model.TimeslotAvailability{
		{
			StartTime: "08:00",
			EndTime:   "09:00",
			Available: true,
		},
		{
			StartTime: "09:00",
			EndTime:   "10:00",
			Available: true,
		},
		{
			StartTime: "10:00",
			EndTime:   "11:00",
			Available: true,
		},
		{
			StartTime: "11:00",
			EndTime:   "12:00",
			Available: true,
		},
		{
			StartTime: "13:00",
			EndTime:   "14:00",
			Available: true,
		},
		{
			StartTime: "14:00",
			EndTime:   "15:00",
			Available: true,
		},
	}

	reserved, err := u.repo.GetReservedSlots(courtID, date)
	if err != nil {
		return nil, err
	}

	// Tandai slot yang sudah di-reserve
	for i := range timeslots {
		for _, r := range reserved {
			if timeslots[i].StartTime == r.StartTime {
				timeslots[i].Available = false
				break
			}
		}
	}

	return timeslots, nil
}
