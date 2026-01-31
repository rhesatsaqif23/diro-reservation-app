package usecase

import (
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/repository"
)

// ClassUsecase handles business logic for classes
type ClassUsecase struct {
	repo repository.ClassRepository
}

func NewClassUsecase(repo repository.ClassRepository) *ClassUsecase {
	return &ClassUsecase{repo: repo}
}

// GetAllClasses returns list of classes (default active only)
func (u *ClassUsecase) GetAllClasses(isActive *bool) ([]model.Class, error) {
	return u.repo.FindAll(isActive)
}

// GetClassByID returns class detail
func (u *ClassUsecase) GetClassByID(id string) (*model.Class, error) {
	return u.repo.FindByID(id)
}
