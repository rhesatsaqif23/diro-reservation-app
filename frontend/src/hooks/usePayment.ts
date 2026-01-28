"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaymentService } from "@/src/services/payment.service";

interface PayParams {
  reservationId: string;
  amount: number;
  email: string;
  name: string;
}

interface SnapResult {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  gross_amount: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (res: SnapResult) => void;
          onPending?: (res: SnapResult) => void;
          onError?: (err: SnapResult) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pay = async ({ reservationId, amount, email, name }: PayParams) => {
    try {
      setLoading(true);

      const { token } = await PaymentService.createSnapToken({
        reservation_id: reservationId,
        email,
        name,
      });

      window.snap.pay(token, {
        onSuccess: () =>
          router.push(`/success?reservation_id=${reservationId}`),
        onPending: () => router.push(`/history`),
        onError: (err) => console.error("Payment error:", err),
        onClose: () => console.warn("User closed payment popup"),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return { pay, loading };
}
