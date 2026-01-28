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

func NewPaymentHandler(paymentUsecase *usecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{paymentUsecase: paymentUsecase}
}

// POST /v1/payment/token
func (h *PaymentHandler) CreateSnapToken(c *gin.Context) {
	var req struct {
		ReservationID string `json:"reservation_id" binding:"required"`
		Email         string `json:"email" binding:"required"`
		Name          string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", nil)
		return
	}

	// === FETCH RESERVATION ===
	reservation, err := h.paymentUsecase.ReservationRepo.
		FindByIDWithPreload(req.ReservationID)

	if err != nil || reservation == nil {
		response.Error(c, 404, "Reservation not found", nil)
		return
	}

	// === CRITICAL VALIDATION ===
	if reservation.Class.ID == "" {
		response.Error(c, 500, "Reservation class not loaded", nil)
		return
	}

	if reservation.Class.Price <= 0 {
		response.Error(c, 500, "Invalid reservation price", nil)
		return
	}

	// === CALCULATE PRICE ===
	amount := reservation.Class.Price
	adminFee := int(float64(amount) * 0.05)
	total := amount + adminFee

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

	// === MIDTRANS CALL ===
	resp, midtransErr := h.paymentUsecase.Snap.CreateTransaction(reqSnap)

	if resp == nil || resp.Token == "" {
		_ = midtransErr
		response.Error(c, 500, "Failed to create snap transaction", nil)
		return
	}

	// === SUCCESS ===
	response.OK(c, "Snap token generated", gin.H{
		"token":     resp.Token,
		"total":     total,
		"admin_fee": adminFee,
	})
}

// POST /v1/payment/notification
func (h *PaymentHandler) HandleNotification(c *gin.Context) {
	var notif map[string]interface{}

	if err := c.ShouldBindJSON(&notif); err != nil {
		c.JSON(400, gin.H{"error": "invalid payload"})
		return
	}

	// SAFE PARSING
	transactionStatus, ok1 := notif["transaction_status"].(string)
	orderID, ok2 := notif["order_id"].(string)

	if !ok1 || !ok2 {
		c.JSON(400, gin.H{"error": "invalid notification structure"})
		return
	}

	reservationID := strings.TrimPrefix(orderID, "RES-")

	var err error

	switch transactionStatus {
	case "capture", "settlement":
		err = h.paymentUsecase.MarkReservationPaid(reservationID)

	case "expire":
		err = h.paymentUsecase.MarkReservationExpired(reservationID)

	case "cancel", "deny":
		err = h.paymentUsecase.MarkReservationCancelled(reservationID)
	}

	if err != nil {
		c.JSON(500, gin.H{"error": "failed to update reservation"})
		return
	}

	c.JSON(200, gin.H{"status": "ok"})
}
