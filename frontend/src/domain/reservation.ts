import { Class } from "./class";
import { Court } from "./court";

export type ReservationStatus = "PENDING" | "PAID" | "CANCELLED";

export interface Reservation {
  id: string;
  user_id: string;
  class_id: string;
  court_id: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  status: ReservationStatus;
  created_at: string;

  class?: Class;
  court?: Court;
}
