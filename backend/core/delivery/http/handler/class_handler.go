package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

// ClassHandler handles HTTP requests for classes
type ClassHandler struct {
	usecase *usecase.ClassUsecase
}

func NewClassHandler(u *usecase.ClassUsecase) *ClassHandler {
	return &ClassHandler{usecase: u}
}

// GET /classes
func (h *ClassHandler) GetAll(c *gin.Context) {
	isActive := true
	classes, err := h.usecase.GetAllClasses(&isActive)
	if err != nil {
		response.InternalServerError(c, err.Error())
		return
	}

	response.OK(c, "Classes fetched successfully", classes)
}

// GET /classes/:id
func (h *ClassHandler) GetByID(c *gin.Context) {
	id := c.Param("id")

	class, err := h.usecase.GetClassByID(id)
	if err != nil {
		response.NotFound(c, "Class not found")
		return
	}

	response.OK(c, "Class fetched successfully", class)
}
