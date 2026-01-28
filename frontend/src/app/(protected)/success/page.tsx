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
  class: { name: string };
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
        console.error(err);
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
    <main className="flex flex-col items-center justify-start py-12 px-4 md:px-10 min-h-screen">
      <div className="max-w-2xl w-full space-y-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold">
            Your booking is confirmed!
          </h1>
          <p className="max-w-md">Payment completed. See you at the studio!</p>
        </div>

        <div className="rounded-xl border shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                Status: {data.status}
              </span>
              <h3 className="text-lg font-bold pt-2">Booking Summary</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
            <div>
              <p className="text-xs uppercase">Class</p>
              <p className="font-semibold">{data.class.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase">Time</p>
              <p className="font-semibold">
                {data.start_time} {data.end_time ? `- ${data.end_time}` : ""}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase">Date</p>
              <p className="font-semibold">{data.date}</p>
            </div>
            {data.location && (
              <div>
                <p className="text-xs uppercase">Location</p>
                <p className="font-semibold">{data.location}</p>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {data.payment_method && (
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{data.payment_method}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Reservation ID</span>
              <span>{data.id}</span>
            </div>
            {data.total && (
              <div className="flex justify-between pt-3 border-t border-dashed">
                <span className="font-bold">Total Amount Paid</span>
                <span className="font-bold">
                  Rp{data.total.toLocaleString("id-ID")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button onClick={() => router.push("/bookings")}>
            View Booking History
          </Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
