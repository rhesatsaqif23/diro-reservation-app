package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

// CourtHandler handles HTTP requests for courts
type CourtHandler struct {
	usecase *usecase.CourtUsecase
}

func NewCourtHandler(u *usecase.CourtUsecase) *CourtHandler {
	return &CourtHandler{usecase: u}
}

// GET /courts
func (h *CourtHandler) GetAll(c *gin.Context) {
	isActive := true
	courtType := c.Query("type")
	var typePtr *string

	if courtType != "" {
		typePtr = &courtType
	}

	courts, err := h.usecase.GetAllCourts(&isActive, typePtr)
	if err != nil {
		response.InternalServerError(c, err.Error())
		return
	}

	response.OK(c, "Courts fetched successfully", courts)
}

func (h *CourtHandler) GetWithAvailability(c *gin.Context) {
	date := c.Query("date")
	startTime := c.Query("start_time")
	courtType := c.Query("type")

	if date == "" || startTime == "" {
		response.BadRequest(c, "date and start_time are required", nil)
		return
	}

	var typePtr *string
	if courtType != "" {
		typePtr = &courtType
	}

	courts, err := h.usecase.GetWithAvailability(date, startTime, typePtr)
	if err != nil {
		response.InternalServerError(c, err.Error())
		return
	}

	response.OK(c, "Courts availability fetched", courts)
}
