export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Payment {
  id: string;
  reservation_id: string;
  provider: string;
  amount: number;
  status: PaymentStatus;
  transaction_id?: string | null;
  created_at: string;
}
