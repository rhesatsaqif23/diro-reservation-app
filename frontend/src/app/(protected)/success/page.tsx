"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/src/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { ReservationService } from "@/src/services/reservation.service";

interface SummaryData {
  id: string;
  status: string;
  date: string;
  start_time: string;
  end_time?: string;
  location?: string;
  payment_method?: string;
  total?: number;
  class: {
    name: string;
  };
}

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservation_id");

  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    if (!reservationId) return;

    (async () => {
      try {
        const summary = await ReservationService.getSummary(reservationId);
        setData(summary);
      } catch (err) {
        console.error("Failed to fetch booking summary", err);
        router.push("/bookings");
      }
    })();
  }, [reservationId, router]);

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-start py-12 px-4 md:px-10 min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl w-full space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your booking is confirmed!
          </h1>
          <p className="text-[#4e5a97] dark:text-[#a1a6c5] max-w-md">
            We&apos;re excited to see you at the studio. A confirmation email
            with receipt details has been sent to your inbox.
          </p>
        </div>

        {/* Card Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 md:p-8 space-y-6">
            {/* Status & Title */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  Status: {data.status}
                </span>
                <h3 className="text-lg font-bold pt-2">Booking Summary</h3>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
                  Class
                </p>
                <p className="text-sm font-semibold">{data.class.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
                  Time
                </p>
                <p className="text-sm font-semibold">
                  {data.start_time}
                  {data.end_time ? ` - ${data.end_time}` : ""}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
                  Date
                </p>
                <p className="text-sm font-semibold">{data.date}</p>
              </div>

              {data.location && (
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase text-slate-600 dark:text-slate-300">
                    Location
                  </p>
                  <p className="text-sm font-semibold">{data.location}</p>
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="space-y-3 text-sm">
              {data.payment_method && (
                <div className="flex justify-between items-center">
                  <p className="text-slate-600 dark:text-slate-300">
                    Payment Method
                  </p>
                  <p className="font-medium">{data.payment_method}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <p className="text-slate-600 dark:text-slate-300">
                  Reservation ID
                </p>
                <p className="font-medium text-right">{data.id}</p>
              </div>

              {data.total && (
                <div className="flex justify-between items-center pt-3 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <p className="font-bold">Total Amount Paid</p>
                  <p className="text-lg font-extrabold text-primary">
                    Rp
                    {data.total.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                    })}
                  </p>
                </div>
            )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
          <Button
            className="w-full sm:w-auto min-w-45 text-sm font-bold"
            onClick={() => router.push("/history")}
          >
            View Booking History
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto min-w-45 text-sm font-bold"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
