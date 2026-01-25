package repository

import "github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"

// ClassRepository defines class data access behavior
type ClassRepository interface {
	FindAll(isActive *bool) ([]model.Class, error)
	FindByID(id string) (*model.Class, error)
}
