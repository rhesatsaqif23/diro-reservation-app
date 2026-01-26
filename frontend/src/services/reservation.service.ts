import { apiFetch } from "../lib/api";
import { getToken } from "../lib/auth";

export function createReservation(payload: {
  class_id: string;
  court_id: string;
  date: string;
  start_time: string;
}) {
  return apiFetch("/reservations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
}
