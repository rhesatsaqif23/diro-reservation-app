package http

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/config"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http/handler"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http/middleware"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/infrastructure/database"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

func NewRouter(db *gorm.DB, cfg *config.Config) *gin.Engine {
	if cfg.Server.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"https://zenpilates-web.vercel.app", // Domain utama
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept"},
		AllowCredentials: true,
	}))

	// Health
	router.GET("/health", func(c *gin.Context) {
		response.OK(c, "Server is running", gin.H{
			"status": "healthy",
			"env":    cfg.Server.Env,
		})
	})

	// DEPENDENCY INJECTION
	// Repositories
	classRepo := database.NewClassRepository(db)
	courtRepo := database.NewCourtRepository(db)
	availabilityRepo := database.NewAvailabilityRepository(db)
	reservationRepo := database.NewReservationRepository(db)

	// Usecases
	classUsecase := usecase.NewClassUsecase(classRepo)
	courtUsecase := usecase.NewCourtUsecase(courtRepo)
	authUsecase := usecase.NewUsecase(db)
	availabilityUsecase := usecase.NewAvailabilityUsecase(availabilityRepo)
	reservationUsecase := usecase.NewReservationUsecase(reservationRepo)
	bookingUsecase := usecase.NewBookingUsecase(
		classRepo,
		courtRepo,
		availabilityRepo,
		reservationRepo,
	)
	paymentUsecase := usecase.NewPaymentUsecase(
		reservationRepo,
		cfg.Midtrans.ServerKey,
		cfg.Midtrans.IsProduction,
	)

	// Handlers
	classHandler := handler.NewClassHandler(classUsecase)
	courtHandler := handler.NewCourtHandler(courtUsecase)
	authHandler := handler.NewAuthHandler(authUsecase, cfg)
	availabilityHandler := handler.NewAvailabilityHandler(availabilityUsecase)
	reservationHandler := handler.NewReservationHandler(reservationUsecase)
	bookingHandler := handler.NewBookingHandler(bookingUsecase)
	paymentHandler := handler.NewPaymentHandler(paymentUsecase)

	// ROUTES
	v1 := router.Group("/v1")
	{
		// Auth
		auth := v1.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// Public
		v1.GET("/classes", classHandler.GetAll)
		v1.GET("/classes/:id", classHandler.GetByID)

		v1.GET("/courts/availability", courtHandler.GetWithAvailability)
		v1.GET("/courts", courtHandler.GetAll)
		v1.GET("/courts/:id/availability", availabilityHandler.GetCourtAvailability)

		v1.GET("/booking/dates", bookingHandler.GetAvailableDates)
		v1.GET("/booking/timeslots", bookingHandler.GetAvailableTimeslots)

		v1.POST("/payment/token", paymentHandler.CreateSnapToken)
		v1.POST("/payment/notification", paymentHandler.HandleNotification)

		// Protected
		protected := v1.Group("/")
		protected.Use(middleware.JWTAuth(cfg.JWT.Secret))
		{
			protected.GET("/profile", func(c *gin.Context) {
				userID := c.GetString("user_id")
				email := c.GetString("email")

				response.OK(c, "Profile fetched", gin.H{
					"user_id": userID,
					"email":   email,
				})
			})

			// RESERVATION
			protected.POST("/reservations", reservationHandler.CreateReservation)
			protected.GET("/reservations/me", reservationHandler.GetBookingHistory)

			// BOOKING DRAFT
			protected.POST("/booking/draft", bookingHandler.CreateDraft)

			// SUMMARY PAGE DATA
			protected.GET(
				"/booking/summary/:id",
				bookingHandler.GetSummary,
			)
		}
	}

	return router
}
