package database

import (
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"gorm.io/gorm"
)

// ClassRepositoryGorm implements ClassRepository using GORM
type ClassRepositoryGorm struct {
	db *gorm.DB
}

func NewClassRepository(db *gorm.DB) *ClassRepositoryGorm {
	return &ClassRepositoryGorm{db: db}
}

// FindAll fetch all classes, optionally filtered by is_active
func (r *ClassRepositoryGorm) FindAll(isActive *bool) ([]model.Class, error) {
	var classes []model.Class

	query := r.db
	if isActive != nil {
		query = query.Where("is_active = ?", *isActive)
	}

	err := query.Order("created_at DESC").Find(&classes).Error
	return classes, err
}

// FindByID fetch class by ID
func (r *ClassRepositoryGorm) FindByID(id string) (*model.Class, error) {
	var class model.Class
	err := r.db.First(&class, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &class, nil
}
