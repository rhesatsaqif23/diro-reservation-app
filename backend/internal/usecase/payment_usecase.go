package usecase

import (
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/repository"
)

type PaymentUsecase struct {
	ReservationRepo repository.ReservationRepository
	Snap            *snap.Client
}

func NewPaymentUsecase(
	reservationRepo repository.ReservationRepository,
	serverKey string,
	isProduction bool,
) *PaymentUsecase {

	snapClient := snap.Client{}

	if isProduction {
		snapClient.New(serverKey, midtrans.Production)
	} else {
		snapClient.New(serverKey, midtrans.Sandbox)
	}

	return &PaymentUsecase{
		ReservationRepo: reservationRepo,
		Snap:            &snapClient,
	}
}

// STATUS UPDATE METHODS
func (u *PaymentUsecase) MarkReservationPaid(id string) error {
	return u.ReservationRepo.UpdateStatus(id, model.ReservationPaid)
}

func (u *PaymentUsecase) MarkReservationExpired(id string) error {
	return u.ReservationRepo.UpdateStatus(id, model.ReservationExpired)
}

func (u *PaymentUsecase) MarkReservationCancelled(id string) error {
	return u.ReservationRepo.UpdateStatus(id, model.ReservationCancelled)
}
