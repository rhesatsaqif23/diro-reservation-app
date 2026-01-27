import { apiFetch } from "@/src/lib/api";
import { TimeslotAvailability } from "@/src/domain/timeslot";
import { Court } from "@/src/domain/court";
import { getToken } from "@/src/lib/auth";

// GENERIC API RESPONSE
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// COURT DTO (BACKEND)
interface CourtResponseDTO {
  ID: string;
  Name: string;
  Type: string | null;
  IsActive: boolean;
  CreatedAt: string;
  Reservations: unknown[] | null;
}

// SUMMARY DTO
export interface BookingSummaryDTO {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;

  class: {
    id: string;
    name: string;
    price: number;
  };

  court: {
    id: string;
    name: string;
  };
}

export class BookingService {
  // AVAILABLE DATES
  static getAvailableDates(classId: string) {
    return apiFetch<ApiResponse<string[]>>(
      `/booking/dates?class_id=${classId}`,
    );
  }

  // AVAILABLE TIMESLOTS
  static getAvailableTimeslots(classId: string, date: string) {
    return apiFetch<ApiResponse<TimeslotAvailability[]>>(
      `/booking/timeslots?class_id=${classId}&date=${date}`,
    );
  }

  // AVAILABLE COURTS
  static async getAvailableCourts(
    classId: string,
    date: string,
    startTime: string,
  ): Promise<ApiResponse<Court[]>> {
    const res = await apiFetch<ApiResponse<CourtResponseDTO[]>>(
      `/booking/courts?class_id=${classId}&date=${date}&start_time=${startTime}`,
    );

    return {
      success: res.success,
      data: res.data.map(
        (court): Court => ({
          id: court.ID,
          name: court.Name,
          type: court.Type,
          is_active: court.IsActive,
          created_at: court.CreatedAt,
          is_available: court.IsActive, // sementara (backend bisa kirim flag sendiri)
        }),
      ),
    };
  }

  // CREATE BOOKING DRAFT
  static createDraft(payload: {
    class_id: string;
    court_id: string;
    date: string;
    start_time: string;
  }) {
    return apiFetch<ApiResponse<{ reservation_id: string }>>("/booking/draft", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });
  }

  // GET BOOKING SUMMARY
  static async getSummary(reservationId: string) {
    const res = await apiFetch<ApiResponse<BookingSummaryDTO>>(
      `/booking/summary/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    return res.data;
  }
}
