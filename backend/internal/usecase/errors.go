package usecase

import "errors"

// Business errors
var (
	ErrSlotAlreadyReserved = errors.New("timeslot already reserved")
)
