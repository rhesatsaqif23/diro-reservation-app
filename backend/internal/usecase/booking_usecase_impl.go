package usecase

import (
	"errors"
	"time"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/repository"
)

type bookingUsecase struct {
	classRepo        repository.ClassRepository
	courtRepo        repository.CourtRepository
	availabilityRepo AvailabilityRepository
	reservationRepo  repository.ReservationRepository
}

func NewBookingUsecase(
	classRepo repository.ClassRepository,
	courtRepo repository.CourtRepository,
	availabilityRepo AvailabilityRepository,
	reservationRepo repository.ReservationRepository,
) BookingUsecase {
	return &bookingUsecase{
		classRepo:        classRepo,
		courtRepo:        courtRepo,
		availabilityRepo: availabilityRepo,
		reservationRepo:  reservationRepo,
	}
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

func (u *bookingUsecase) GetAvailableTimeslots(
	classID string,
	date time.Time,
) ([]model.TimeslotAvailability, error) {

	class, err := u.classRepo.FindByID(classID)
	if err != nil {
		return nil, err
	}

	duration := class.DurationMinutes // 90

	// jam operasional
	startHour := 8
	endHour := 15

	startMinute := startHour * 60
	endMinute := endHour * 60

	var slots []model.TimeslotAvailability

	for m := startMinute; m+duration <= endMinute; m += duration {
		start := time.Date(
			date.Year(),
			date.Month(),
			date.Day(),
			m/60,
			m%60,
			0,
			0,
			time.Local,
		)

		end := start.Add(time.Minute * time.Duration(duration))

		slots = append(slots, model.TimeslotAvailability{
			StartTime: start.Format("15:04"),
			EndTime:   end.Format("15:04"),
			Available: true, // nanti dihubungkan ke reservation
		})
	}

	return slots, nil
}

func (u *bookingUsecase) GetAvailableCourts(
	classID string,
	date time.Time,
	startTime string,
) ([]model.Court, error) {

	class, err := u.classRepo.FindByID(classID)
	if err != nil {
		return nil, err
	}

	courts, err := u.courtRepo.FindAll(
		ptrBool(true),
		&class.RequiredCourtType,
	)
	if err != nil {
		return nil, err
	}

	var available []model.Court

	for _, court := range courts {
		reserved, _ := u.availabilityRepo.GetReservedSlots(
			court.ID,
			date,
		)

		conflict := false
		for _, r := range reserved {
			if r.StartTime == startTime {
				conflict = true
				break
			}
		}

		if !conflict {
			available = append(available, court)
		}
	}

	return available, nil
}

func (u *bookingUsecase) CreateDraft(
	userID string,
	classID string,
	courtID string,
	date time.Time,
	startTime string,
) (*model.Reservation, error) {

	// 1. cek slot masih available
	reserved, err := u.availabilityRepo.GetReservedSlots(courtID, date)
	if err != nil {
		return nil, err
	}

	for _, r := range reserved {
		if r.StartTime == startTime {
			return nil, errors.New("slot already reserved")
		}
	}

	// 2. create reservation (DRAFT)
	reservation := &model.Reservation{
		UserID:    userID,
		ClassID:   classID,
		CourtID:   courtID,
		Date:      date,
		StartTime: startTime,
		Status:    model.ReservationPending,
	}

	if err := u.reservationRepo.Create(reservation); err != nil {
		return nil, err
	}

	return reservation, nil
}

func (u *bookingUsecase) GetSummary(id string) (*model.Reservation, error) {
	return u.reservationRepo.FindByIDWithPreload(id)
}

func ptrBool(v bool) *bool {
	return &v
}
