package handler

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

type BookingHandler struct {
	usecase usecase.BookingUsecase
}

type CreateDraftRequest struct {
	ClassID   string `json:"class_id"`
	CourtID   string `json:"court_id"`
	Date      string `json:"date"`       // YYYY-MM-DD
	StartTime string `json:"start_time"` // HH:mm
}

func NewBookingHandler(u usecase.BookingUsecase) *BookingHandler {
	return &BookingHandler{usecase: u}
}

// GET /v1/booking/dates
func (h *BookingHandler) GetAvailableDates(c *gin.Context) {
	dates := h.usecase.GetAvailableDates()
	response.OK(c, "Available booking dates", dates)
}

// GET /v1/booking/timeslots
func (h *BookingHandler) GetAvailableTimeslots(c *gin.Context) {
	classID := c.Query("class_id")
	dateStr := c.Query("date")

	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		response.Error(c, 400, "invalid date", nil)
		return
	}

	data, err := h.usecase.GetAvailableTimeslots(classID, date)
	if err != nil {
		response.Error(c, 500, err.Error(), nil)
		return
	}

	response.OK(c, "Available timeslots", data)
}

// GET /v1/booking/courts
func (h *BookingHandler) GetAvailableCourts(c *gin.Context) {
	classID := c.Query("class_id")
	dateStr := c.Query("date")
	startTime := c.Query("start_time")

	date, _ := time.Parse("2006-01-02", dateStr)

	data, err := h.usecase.GetAvailableCourts(
		classID,
		date,
		startTime,
	)
	if err != nil {
		response.Error(c, 500, err.Error(), nil)
		return
	}

	response.OK(c, "Available courts", data)
}

func (h *BookingHandler) CreateDraft(c *gin.Context) {
	var req CreateDraftRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, 400, err.Error(), nil)
		return
	}

	userID := c.GetString("user_id")
	if userID == "" {
		response.Error(c, 401, "unauthorized", nil)
		return
	}

	date, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		response.Error(c, 400, "invalid date format", nil)
		return
	}

	reservation, err := h.usecase.CreateDraft(
		userID,
		req.ClassID,
		req.CourtID,
		date,
		req.StartTime,
	)
	if err != nil {
		response.Error(c, 400, err.Error(), nil)
		return
	}

	response.OK(c, "Booking draft created", gin.H{
		"reservation_id": reservation.ID,
	})
}

func (h *BookingHandler) GetSummary(c *gin.Context) {
	id := c.Param("id")

	reservation, err := h.usecase.GetSummary(id)
	if err != nil {
		response.Error(c, 404, err.Error(), nil)
		return
	}

	start, err := time.Parse("15:04:05", reservation.StartTime)
	if err != nil {
		response.Error(c, 500, "invalid start time format", nil)
		return
	}

	duration := reservation.Class.DurationMinutes
	end := start.Add(time.Minute * time.Duration(duration))

	base := reservation.Class.Price
	admin := int(float64(base) * 0.05)
	total := base + admin

	response.OK(c, "Booking summary", gin.H{
		"id":         reservation.ID,
		"date":       reservation.Date.Format("2006-01-02"),
		"start_time": start.Format("15:04"),
		"end_time":   end.Format("15:04"),
		"status":     reservation.Status,

		"class": gin.H{
			"id":    reservation.Class.ID,
			"name":  reservation.Class.Name,
			"price": reservation.Class.Price,
		},

		"court": gin.H{
			"id":   reservation.Court.ID,
			"name": reservation.Court.Name,
		},

		"user": gin.H{
			"name":  reservation.User.Name,
			"email": reservation.User.Email,
		},

		"base_price": base,
		"admin_fee":  admin,
		"total":      total,
	})

}
