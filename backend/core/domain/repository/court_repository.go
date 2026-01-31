package repository

import "github.com/rhesatsaqif23/diro-reservation-app/backend/core/domain/model"

// CourtRepository defines court data access behavior
type CourtRepository interface {
	FindAll(isActive *bool, courtType *string) ([]model.Court, error)

	FindWithAvailability(
		date string,
		startTime string,
		requiredCourtType *string,
	) ([]model.CourtAvailability, error)
}
