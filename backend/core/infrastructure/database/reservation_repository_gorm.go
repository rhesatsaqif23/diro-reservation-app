package database

import (
	"time"

	"gorm.io/gorm"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/repository"
)

type reservationRepository struct {
	db *gorm.DB
}

func NewReservationRepository(db *gorm.DB) repository.ReservationRepository {
	return &reservationRepository{db: db}
}

func (r *reservationRepository) Create(res *model.Reservation) error {
	return r.db.Create(res).Error
}

func (r *reservationRepository) FindByUserID(
	userID string,
) ([]model.Reservation, error) {

	var reservations []model.Reservation
	err := r.db.
		Preload("Class").
		Preload("Court").
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Find(&reservations).Error

	return reservations, err
}

func (r *reservationRepository) IsSlotReserved(
	courtID string,
	date time.Time,
	startTime string,
) (bool, error) {

	var count int64
	err := r.db.Model(&model.Reservation{}).
		Where(
			"court_id = ? AND date = ? AND start_time = ? AND status != ?",
			courtID, date, startTime, model.ReservationCancelled,
		).
		Count(&count).Error

	return count > 0, err
}

func (r *reservationRepository) FindByIDWithPreload(
	id string,
) (*model.Reservation, error) {

	var reservation model.Reservation
	err := r.db.
		Preload("User").
		Preload("Class").
		Preload("Court").
		First(&reservation, "id = ?", id).
		Error

	if err != nil {
		return nil, err
	}

	return &reservation, nil
}

func (r *reservationRepository) UpdateStatus(id string, status model.ReservationStatus) error {
	return r.db.Model(&model.Reservation{}).
		Where("id = ?", id).
		Update("status", status).
		Error
}
