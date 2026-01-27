package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

type BookingHandler struct {
	usecase usecase.BookingUsecase
}

func NewBookingHandler(u usecase.BookingUsecase) *BookingHandler {
	return &BookingHandler{usecase: u}
}

// GET /v1/booking/dates
func (h *BookingHandler) GetAvailableDates(c *gin.Context) {
	dates := h.usecase.GetAvailableDates()
	response.OK(c, "Available booking dates", dates)
}
