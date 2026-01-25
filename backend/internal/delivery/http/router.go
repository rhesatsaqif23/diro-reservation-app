package http

import (
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/config"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/delivery/http/handler"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/delivery/http/middleware"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/usecase/auth"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewRouter(db *gorm.DB, cfg *config.Config) *gin.Engine {
	// Gin mode
	if cfg.Server.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Global middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.Server.AllowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Public endpoints

	// Health check
	router.GET("/health", func(c *gin.Context) {
		response.OK(c, "Server is running", gin.H{
			"status":  "healthy",
			"env":     cfg.Server.Env,
			"version": "1.0.0",
		})
	})

	// API v1
	v1 := router.Group("/v1")
	{
		v1.GET("/test", func(c *gin.Context) {
			response.OK(c, "API v1 is working", gin.H{
				"message": "Welcome to DIRO Pilates API",
			})
		})

		// Auth
		authUsecase := auth.NewUsecase(db)
		authHandler := handler.NewAuthHandler(authUsecase, cfg)

		auth := v1.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// Protected endpoints
		protected := v1.Group("")
		protected.Use(middleware.JWTAuth(cfg.JWT.Secret))
		{
			protected.GET("/profile", func(c *gin.Context) {
				userID, _ := c.Get("user_id")
				email, _ := c.Get("email")

				response.OK(c, "Profile fetched", gin.H{
					"user_id": userID,
					"email":   email,
				})
			})
		}

		// Classes
		classes := v1.Group("/classes")
		{
			classes.GET("", func(c *gin.Context) {
				response.OK(c, "List classes (TODO)", nil)
			})

			classes.GET("/:id", func(c *gin.Context) {
				response.OK(c, "Class detail (TODO)", nil)
			})
		}

		// Reservations
		reservations := v1.Group("/reservations")
		{
			reservations.POST("", func(c *gin.Context) {
				response.Created(c, "Reservation created (TODO)", nil)
			})

			reservations.GET("/me", func(c *gin.Context) {
				response.OK(c, "My reservations (TODO)", nil)
			})

			reservations.DELETE("/:id", func(c *gin.Context) {
				response.OK(c, "Reservation cancelled (TODO)", nil)
			})
		}

		// Payments (Midtrans)
		payments := v1.Group("/payments")
		{
			payments.POST("/callback", func(c *gin.Context) {
				response.OK(c, "Midtrans callback received (TODO)", nil)
			})
		}
	}

	return router
}
