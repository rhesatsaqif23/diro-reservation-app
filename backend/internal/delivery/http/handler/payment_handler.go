package handler

import (
	"strings"

	"github.com/gin-gonic/gin"
	midtrans "github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/usecase"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/pkg/response"
)

type PaymentHandler struct {
	paymentUsecase *usecase.PaymentUsecase
}

// Create new payment handler
func NewPaymentHandler(paymentUsecase *usecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{paymentUsecase: paymentUsecase}
}

// Generate Midtrans Snap token for reservation payment
// POST /v1/payment/token
func (h *PaymentHandler) CreateSnapToken(c *gin.Context) {
	var req struct {
		ReservationID string `json:"reservation_id" binding:"required"`
		Email         string `json:"email" binding:"required"`
		Name          string `json:"name" binding:"required"`
	}

	// Validate request body
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", nil)
		return
	}

	// Fetch reservation with required relations
	reservation, err := h.paymentUsecase.ReservationRepo.
		FindByIDWithPreload(req.ReservationID)
	if err != nil || reservation == nil {
		response.Error(c, 404, "Reservation not found", nil)
		return
	}

	// Ensure reservation class and price are valid
	if reservation.Class.ID == "" || reservation.Class.Price <= 0 {
		response.Error(c, 500, "Invalid reservation data", nil)
		return
	}

	// Calculate payment amount and admin fee
	amount := reservation.Class.Price
	adminFee := int(float64(amount) * 0.05)
	total := amount + adminFee

	// Define transaction items
	items := []midtrans.ItemDetails{
		{
			ID:    reservation.ID,
			Name:  reservation.Class.Name,
			Price: int64(amount),
			Qty:   1,
		},
		{
			ID:    "ADMIN-FEE",
			Name:  "Admin Fee",
			Price: int64(adminFee),
			Qty:   1,
		},
	}

	// Build snap transaction request
	reqSnap := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  "RES-" + reservation.ID,
			GrossAmt: int64(total),
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: req.Name,
			Email: req.Email,
		},
		Items: &items,
	}

	// Request snap token to Midtrans
	resp, err := h.paymentUsecase.Snap.CreateTransaction(reqSnap)
	if err != nil || resp == nil || resp.Token == "" {
		response.Error(c, 500, "Failed to generate payment token", nil)
		return
	}

	// Return snap token to client
	response.OK(c, "Snap token generated", gin.H{
		"token":     resp.Token,
		"total":     total,
		"admin_fee": adminFee,
	})
}

// Handle Midtrans payment notification
// POST /v1/payment/notification
func (h *PaymentHandler) HandleNotification(c *gin.Context) {
	var notif map[string]interface{}

	// Parse notification payload
	if err := c.ShouldBindJSON(&notif); err != nil {
		c.JSON(400, gin.H{"error": "invalid payload"})
		return
	}

	// Extract required notification fields
	transactionStatus, ok1 := notif["transaction_status"].(string)
	orderID, ok2 := notif["order_id"].(string)
	if !ok1 || !ok2 {
		c.JSON(400, gin.H{"error": "invalid notification structure"})
		return
	}

	fraudStatus, _ := notif["fraud_status"].(string)
	reservationID := strings.TrimPrefix(orderID, "RES-")

	// Fetch related reservation
	reservation, err := h.paymentUsecase.ReservationRepo.
		FindByIDWithPreload(reservationID)
	if err != nil || reservation == nil {
		c.JSON(200, gin.H{"status": "ignored"})
		return
	}

	// Ignore notification if reservation already paid
	if reservation.Status == "PAID" {
		c.JSON(200, gin.H{"status": "ignored"})
		return
	}

	// Handle transaction status
	switch transactionStatus {

	case "capture":
		if fraudStatus == "accept" {
			err = h.paymentUsecase.MarkReservationPaid(reservationID)
		}

	case "settlement":
		err = h.paymentUsecase.MarkReservationPaid(reservationID)

	case "expire":
		err = h.paymentUsecase.MarkReservationCancelled(reservationID)

	default:
		// Unhandled status
	}

	// Handle update failure
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to update reservation"})
		return
	}

	// Acknowledge notification
	c.JSON(200, gin.H{"status": "ok"})
}
