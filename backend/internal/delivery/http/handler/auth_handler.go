package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/config"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/infrastructure/security"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/usecase/auth"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

type AuthHandler struct {
	usecase *auth.Usecase
	cfg     *config.Config
}

func NewAuthHandler(usecase *auth.Usecase, cfg *config.Config) *AuthHandler {
	return &AuthHandler{usecase: usecase, cfg: cfg}
}

type registerRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request", err.Error())
		return
	}

	user, err := h.usecase.Register(req.Name, req.Email, req.Password)
	if err != nil {
		response.Conflict(c, err.Error(), nil)
		return
	}

	response.Created(c, "User registered successfully", gin.H{
		"id":    user.ID,
		"email": user.Email,
	})
}

type loginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request", err.Error())
		return
	}

	user, err := h.usecase.Login(req.Email, req.Password)
	if err != nil {
		response.Unauthorized(c, err.Error())
		return
	}

	token, err := security.GenerateToken(
		user.ID,
		user.Email,
		h.cfg.JWT.Secret,
		h.cfg.JWT.ExpireHours,
	)
	if err != nil {
		response.InternalServerError(c, "Failed to generate token")
		return
	}

	response.OK(c, "Login successful", gin.H{
		"access_token": token,
	})
}
