"use client";

import { useEffect, useState } from "react";
import { ReservationService } from "@/src/services/reservation.service";
import { ReservationHistory } from "@/src/domain/reservationHistory";
import HistoryTabs from "@/src/components/history/HistoryTabs";
import HistoryCard from "@/src/components/history/HistoryCard";

type TabValue = "upcoming" | "past";

export default function HistoryPage() {
  const [tab, setTab] = useState<TabValue>("upcoming");
  const [data, setData] = useState<ReservationHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ReservationService.getMyReservations();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = data.filter((r) =>
    tab === "upcoming"
      ? r.status === "PENDING" || r.status === "PAID"
      : r.status === "CANCELLED",
  );

  return (
    <main className="flex justify-center py-10 px-4 md:px-10">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          My Booking History
        </h1>

        <p className="text-slate-500">Manage and view your pilates sessions</p>

        <HistoryTabs value={tab} onChange={setTab} />

        {loading ? (
          <p className="text-center text-slate-400 py-10">Loading...</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((reservation) => (
              <HistoryCard key={reservation.id} reservation={reservation} />
            ))}

            {filtered.length === 0 && (
              <p className="text-slate-400 text-center py-10">
                No bookings found.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
