import axios from "axios";
import { Class } from "@/src/domain/class";

// BASE URL backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Bentuk response API (wrapper)
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const ClassService = {
  // GET /v1/classes
  getAll: async (): Promise<Class[]> => {
    const res = await axios.get<ApiResponse<ClassResponseDTO[]>>(
      `${API_BASE}/v1/classes`,
    );

    return res.data.data.map(
      (item): Class => ({
        id: item.ID,
        name: item.Name,
        duration_minutes: item.DurationMinutes,
        price: item.Price,
        description: item.Description,
        required_court_type: item.RequiredCourtType,
        image_url: item.ImageURL,
        is_active: item.IsActive,
        created_at: item.CreatedAt,
      }),
    );
  },

  // GET /v1/classes/:id
  getByID: async (id: string): Promise<Class> => {
    const res = await axios.get<ApiResponse<ClassResponseDTO>>(
      `${API_BASE}/v1/classes/${id}`,
    );

    const item = res.data.data;

    return {
      id: item.ID,
      name: item.Name,
      duration_minutes: item.DurationMinutes,
      price: item.Price,
      description: item.Description,
      required_court_type: item.RequiredCourtType,
      image_url: item.ImageURL,
      is_active: item.IsActive,
      created_at: item.CreatedAt,
    };
  },
};
