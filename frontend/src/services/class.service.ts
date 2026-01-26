import axios from "axios";
import { Class } from "../domain/class";

// BASE URL backend, bisa dari env
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1";

// CLASS SERVICE
export const ClassService = {
  // GET /classes
  getAll: async (): Promise<Class[]> => {
    const res = await axios.get(`${API_BASE}/classes`);
    return res.data.data;
  },

  // GET /classes/:id
  getByID: async (id: string): Promise<Class> => {
    const res = await axios.get(`${API_BASE}/classes/${id}`);
    return res.data.data;
  },
};
