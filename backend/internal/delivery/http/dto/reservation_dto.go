package dto

// Request create reservation
type CreateReservationRequest struct {
	ClassID   string `json:"class_id" binding:"required,uuid"`
	CourtID   string `json:"court_id" binding:"required,uuid"`
	Date      string `json:"date" binding:"required"`       // YYYY-MM-DD
	StartTime string `json:"start_time" binding:"required"` // HH:MM
}

// Response reservation
type ReservationResponse struct {
	ID        string `json:"id"`
	ClassID   string `json:"class_id"`
	CourtID   string `json:"court_id"`
	Date      string `json:"date"`
	StartTime string `json:"start_time"`
	Status    string `json:"status"`
}
