import { apiFetch } from "../lib/api";
import { getToken } from "../lib/auth";

export class PaymentService {
  static async createSnapToken(payload: {
    reservation_id: string;
    email: string;
    name: string;
  }) {
    const res = await apiFetch<{
      success: boolean;
      data: { token: string; total: number; admin_fee: number };
    }>("/payment/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    return res.data;
  }
}
