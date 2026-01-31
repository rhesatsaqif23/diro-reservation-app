package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

// HTTP handler untuk availability court
type AvailabilityHandler struct {
	usecase usecase.AvailabilityUsecase
}

func NewAvailabilityHandler(u usecase.AvailabilityUsecase) *AvailabilityHandler {
	return &AvailabilityHandler{usecase: u}
}

// GET /v1/courts/:id/availability?date=YYYY-MM-DD
func (h *AvailabilityHandler) GetCourtAvailability(c *gin.Context) {
	courtID := c.Param("id")
	if courtID == "" {
		response.Error(c, http.StatusBadRequest, "court_id is required", nil)
		return
	}

	dateStr := c.Query("date")
	if dateStr == "" {
		response.Error(c, http.StatusBadRequest, "date is required", nil)
		return
	}

	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "invalid date format", nil)
		return
	}

	data, err := h.usecase.GetCourtAvailability(courtID, date)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	response.OK(c, "Court availability fetched", data)
}
