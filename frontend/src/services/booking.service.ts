import { apiFetch } from "@/src/lib/api";
import { TimeslotAvailability } from "@/src/domain/timeslot";
import { Court } from "@/src/domain/court";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class BookingService {
  static getAvailableDates(classId: string) {
    return apiFetch<ApiResponse<string[]>>(
      `/booking/dates?class_id=${classId}`,
    );
  }

  // endpoint ini BELUM ADA di router Go
  static getAvailableTimeslots(classId: string, date: string) {
    return apiFetch<ApiResponse<TimeslotAvailability[]>>(
      `/booking/timeslots?class_id=${classId}&date=${date}`,
    );
  }

  // endpoint ini BELUM ADA di router Go
  static getAvailableCourts(classId: string, date: string, startTime: string) {
    return apiFetch<ApiResponse<Court[]>>(
      `/booking/courts?class_id=${classId}&date=${date}&start_time=${startTime}`,
    );
  }
}
