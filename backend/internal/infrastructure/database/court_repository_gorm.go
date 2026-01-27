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

func (r *CourtRepositoryGorm) FindWithAvailability(
	date string,
	startTime string,
	requiredCourtType *string,
) ([]model.CourtAvailability, error) {

	var courts []model.CourtAvailability

	query := `
		SELECT
			c.id,
			c.name,
			c.type,
			CASE
				WHEN r.id IS NULL THEN true
				ELSE false
			END AS is_available
		FROM courts c
		LEFT JOIN reservations r
			ON r.court_id = c.id
			AND r.date = ?
			AND r.start_time = ?
			AND r.status IN ('PENDING', 'PAID')
		WHERE c.is_active = true
	`

	args := []interface{}{date, startTime}

	if requiredCourtType != nil {
		query += " AND c.type = ?"
		args = append(args, *requiredCourtType)
	}

	query += " ORDER BY c.created_at ASC"

	err := r.db.Raw(query, args...).Scan(&courts).Error
	return courts, err
}
