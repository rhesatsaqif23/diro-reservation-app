import axios from "axios";
import { TimeslotAvailability } from "../domain/timeslot";
import { Court } from "../domain/court";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// COURT SERVICE
export const CourtService = {
  // GET /courts
  getAll: async (): Promise<Court[]> => {
    const res = await axios.get(`${API_BASE}/courts`);
    return res.data.data;
  },

  // GET /courts/:id/availability?date=YYYY-MM-DD
  getAvailability: async (
    courtID: string,
    date: string,
  ): Promise<TimeslotAvailability[]> => {
    const res = await axios.get(`${API_BASE}/courts/${courtID}/availability`, {
      params: { date },
    });
    return res.data.data;
  },

  getWithAvailability: async (
    date: string,
    start_time: string,
    requiredCourtType: string,
  ): Promise<Court[]> => {
    const res = await axios.get(`${API_BASE}/v1/courts/availability`, {
      params: {
        date,
        start_time,
        type: requiredCourtType,
      },
    });

    return res.data.data;
  },
};
