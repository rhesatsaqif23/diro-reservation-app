package model

type TimeslotAvailability struct {
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
	Available bool   `json:"available"`
}
