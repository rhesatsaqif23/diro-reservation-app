import axios from "axios";
import { TimeslotAvailability } from "../domain/timeslot";
import { Court } from "../domain/court";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1";

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
};
