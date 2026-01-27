package usecase

import (
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/repository"
)

// CourtUsecase handles business logic for courts
type CourtUsecase struct {
	repo repository.CourtRepository
}

func NewCourtUsecase(repo repository.CourtRepository) *CourtUsecase {
	return &CourtUsecase{repo: repo}
}

// GetAllCourts returns list of courts
func (u *CourtUsecase) GetAllCourts(isActive *bool, courtType *string) ([]model.Court, error) {
	return u.repo.FindAll(isActive, courtType)
}

func (u *CourtUsecase) GetWithAvailability(
	date string,
	startTime string,
	courtType *string,
) ([]model.CourtAvailability, error) {
	return u.repo.FindWithAvailability(date, startTime, courtType)
}
