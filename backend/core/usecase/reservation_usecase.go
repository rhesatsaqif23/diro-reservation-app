package usecase

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http/dto"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/repository"
)

var ErrSlotAlreadyReserved = errors.New("slot already reserved")

// Interface
type ReservationUsecase interface {
	CreateReservation(
		userID string,
		req dto.CreateReservationRequest,
	) (*model.Reservation, error)

	GetBookingHistory(
		userID string,
	) ([]dto.ReservationHistoryResponse, error)

	GetByIDWithPreload(
		id string,
		userID string,
	) (*model.Reservation, error)
}

// Implementation
type reservationUsecase struct {
	repo repository.ReservationRepository
}

func NewReservationUsecase(
	repo repository.ReservationRepository,
) ReservationUsecase {
	return &reservationUsecase{repo: repo}
}

/* CREATE */
func (u *reservationUsecase) CreateReservation(
	userID string,
	req dto.CreateReservationRequest,
) (*model.Reservation, error) {

	date, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		return nil, err
	}

	isReserved, err := u.repo.IsSlotReserved(
		req.CourtID,
		date,
		req.StartTime,
	)
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

/* HISTORY */
func (u *reservationUsecase) GetBookingHistory(
	userID string,
) ([]dto.ReservationHistoryResponse, error) {

	reservations, err := u.repo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	result := make([]dto.ReservationHistoryResponse, 0, len(reservations))

	for _, r := range reservations {
		item := dto.ReservationHistoryResponse{
			ID:        r.ID,
			Status:    string(r.Status),
			Date:      r.Date.Format("2006-01-02"),
			StartTime: r.StartTime,
		}

		/* CLASS (optional & safe) */
		if r.Class.ID != "" {
			image := ""
			if r.Class.ImageURL != nil {
				image = *r.Class.ImageURL
			}

			item.Class = &struct {
				ID       string `json:"id"`
				Name     string `json:"name"`
				Price    int    `json:"price"`
				ImageURL string `json:"image_url"`
			}{
				ID:       r.Class.ID,
				Name:     r.Class.Name,
				Price:    r.Class.Price,
				ImageURL: image,
			}
		}

		/* COURT (optional & safe) */
		if r.Court.ID != "" {
			item.Court = &struct {
				Name string `json:"name"`
			}{
				Name: r.Court.Name,
			}
		}

		result = append(result, item)
	}

	return result, nil
}

/* DETAIL */
func (u *reservationUsecase) GetByIDWithPreload(
	id string,
	userID string,
) (*model.Reservation, error) {

	res, err := u.repo.FindByIDWithPreload(id)
	if err != nil {
		return nil, err
	}

	if res.UserID != userID {
		return nil, errors.New("forbidden")
	}

	return res, nil
}
