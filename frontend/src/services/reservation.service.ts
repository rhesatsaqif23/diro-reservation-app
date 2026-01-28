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

export class ReservationService {
  static async getSummary(id: string) {
    return apiFetch<{
      success: boolean;
      data: {
        id: string;
        status: string;
        date: string;
        start_time: string;
        end_time?: string;
        total?: number;
        location?: string;
        payment_method?: string;
        class: { name: string };
        court?: { name: string };
      };
    }>(`/booking/summary/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => res.data);
  }
}
