export interface ReservationHistory {
  id: string;
  status: "PAID" | "PENDING" | "CANCELLED";
  date: string;
  start_time: string;
  class?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
  court?: {
    name: string;
  };
}
