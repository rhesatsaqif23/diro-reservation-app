"use client";

import { ShieldCheck, CreditCard, Wallet, QrCode } from "lucide-react";
import Button from "../ui/Button";
import { usePayment } from "@/src/hooks/usePayment";

interface Props {
  reservationId: string;
  amount: number;
  email: string;
  name: string;
}

export default function PaymentInfo({
  reservationId,
  amount,
  email,
  name,
}: Props) {
  const { pay, loading } = usePayment();

  return (
    <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-9 w-9 rounded-lg bg-primary/10 p-2 text-primary">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Secure Midtrans Checkout
          </h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            You will be redirected to Midtrans Snap to finish payment.
          </p>
          <div className="mt-3 flex gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Wallet size={14} /> GoPay
            </span>
            <span className="flex items-center gap-1">
              <CreditCard size={14} /> Credit Card
            </span>
            <span className="flex items-center gap-1">
              <QrCode size={14} /> QRIS
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          disabled={loading}
          className="w-full text-lg font-bold"
          onClick={() => pay({ reservationId, amount, email, name })}
        >
          {loading ? "Processing..." : "Pay with Midtrans"}
        </Button>

        <button className="w-full text-sm font-medium text-slate-500 hover:underline dark:text-slate-400">
          Cancel and Change Selection
        </button>
      </div>
    </div>
  );
}
