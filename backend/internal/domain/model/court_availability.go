package model

type CourtAvailability struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Type        *string `json:"type"`
	IsAvailable bool    `json:"is_available"`
}
