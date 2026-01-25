package database

import (
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"gorm.io/gorm"
)

// CourtRepositoryGorm implements CourtRepository using GORM
type CourtRepositoryGorm struct {
	db *gorm.DB
}

func NewCourtRepository(db *gorm.DB) *CourtRepositoryGorm {
	return &CourtRepositoryGorm{db: db}
}

// FindAll fetch all courts with optional filters
func (r *CourtRepositoryGorm) FindAll(isActive *bool, courtType *string) ([]model.Court, error) {
	var courts []model.Court

	query := r.db
	if isActive != nil {
		query = query.Where("is_active = ?", *isActive)
	}
	if courtType != nil {
		query = query.Where("type = ?", *courtType)
	}

	err := query.Order("created_at ASC").Find(&courts).Error
	return courts, err
}
