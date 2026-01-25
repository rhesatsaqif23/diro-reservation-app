package repository

import "github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"

// CourtRepository defines court data access behavior
type CourtRepository interface {
	FindAll(isActive *bool, courtType *string) ([]model.Court, error)
}
