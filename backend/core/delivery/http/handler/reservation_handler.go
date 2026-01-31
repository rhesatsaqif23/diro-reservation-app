package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http/dto"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

// Reservation HTTP handler
type ReservationHandler struct {
	usecase usecase.ReservationUsecase
}

func NewReservationHandler(u usecase.ReservationUsecase) *ReservationHandler {
	return &ReservationHandler{usecase: u}
}

// POST /v1/reservations
func (h *ReservationHandler) CreateReservation(c *gin.Context) {
	userID := c.GetString("user_id") // dari JWT middleware

	var req dto.CreateReservationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "invalid request", err.Error())
		return
	}

	res, err := h.usecase.CreateReservation(userID, req)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Created(c, "Reservation created", res)
}

// GET /v1/reservations/history
func (h *ReservationHandler) GetBookingHistory(c *gin.Context) {
	userID := c.GetString("user_id")

	data, err := h.usecase.GetBookingHistory(userID)
	if err != nil {
		response.Error(c, 500, err.Error(), nil)
		return
	}

	response.OK(c, "Booking history fetched", data)
}

// GET /v1/booking/summary/:id
func (h *ReservationHandler) GetByIDWithPreload(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetString("user_id")

	res, err := h.usecase.GetByIDWithPreload(id, userID)
	if err != nil {
		if err.Error() == "forbidden" {
			response.Error(c, http.StatusForbidden, "access denied", nil)
			return
		}
		response.Error(c, http.StatusNotFound, err.Error(), nil)
		return
	}

	response.OK(c, "Booking summary fetched", res)
}
