package usecase

import "time"

type BookingUsecase interface {
	GetAvailableDates() []string
}

type bookingUsecase struct{}

func NewBookingUsecase() BookingUsecase {
	return &bookingUsecase{}
}

func (u *bookingUsecase) GetAvailableDates() []string {
	today := time.Now()
	daysAhead := 7

	var dates []string
	for i := 0; i < daysAhead; i++ {
		d := today.AddDate(0, 0, i)
		dates = append(dates, d.Format("2006-01-02"))
	}

	return dates
}
