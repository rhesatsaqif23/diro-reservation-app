package usecase

import (
	"time"

	"github.com/google/uuid"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/delivery/http/dto"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/repository"
)

// Reservation business logic
type ReservationUsecase interface {
	CreateReservation(userID string, req dto.CreateReservationRequest) (*model.Reservation, error)
	GetBookingHistory(userID string) ([]model.Reservation, error)
}

type reservationUsecase struct {
	repo repository.ReservationRepository
}

func NewReservationUsecase(repo repository.ReservationRepository) ReservationUsecase {
	return &reservationUsecase{repo: repo}
}

// Create new reservation
func (u *reservationUsecase) CreateReservation(
	userID string,
	req dto.CreateReservationRequest,
) (*model.Reservation, error) {

	date, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		return nil, err
	}

	// Check availability
	isReserved, err := u.repo.IsSlotReserved(req.CourtID, date, req.StartTime)
	if err != nil {
		return nil, err
	}
	if isReserved {
		return nil, ErrSlotAlreadyReserved
	}

	reservation := &model.Reservation{
		ID:        uuid.NewString(),
		UserID:    userID,
		ClassID:   req.ClassID,
		CourtID:   req.CourtID,
		Date:      date,
		StartTime: req.StartTime,
		Status:    model.ReservationPending,
	}

	if err := u.repo.Create(reservation); err != nil {
		return nil, err
	}

	return u.repo.FindByIDWithPreload(reservation.ID)
}

// Booking history
func (u *reservationUsecase) GetBookingHistory(userID string) ([]model.Reservation, error) {
	return u.repo.FindByUserID(userID)
}
