package dto

type ReservationHistoryResponse struct {
	ID        string `json:"id"`
	Status    string `json:"status"`
	Date      string `json:"date"`
	StartTime string `json:"start_time"`

	Class *struct {
		ID       string `json:"id"`
		Name     string `json:"name"`
		Price    int    `json:"price"`
		ImageURL string `json:"image_url"`
	} `json:"class,omitempty"`

	Court *struct {
		Name string `json:"name"`
	} `json:"court,omitempty"`
}
