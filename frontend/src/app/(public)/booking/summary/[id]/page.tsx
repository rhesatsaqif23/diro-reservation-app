"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SummaryCard from "@/src/components/summary/SummaryCard";
import { BookingService } from "@/src/services/booking.service";
import { BookingSummary } from "@/src/domain/booking";
import { mapBookingSummaryDTO } from "@/src/mappers/booking.mapper";

export default function SummaryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  useEffect(() => {
    if (!id) return;

    BookingService.getSummary(id)
      .then((dto) => {
        setSummary(mapBookingSummaryDTO(dto));
      })

      .catch((err) => {
        console.error(err);

        // optional: auth guard
        if (err.status === 401) {
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <main className="flex justify-center px-4 py-10">
        <p className="text-slate-500">Loading booking summary...</p>
      </main>
    );
  }

  if (!summary) return null;

  return (
    <main className="flex justify-center px-4 py-10">
      <div className="w-full max-w-200 space-y-4">
        {/* Headline */}
        <div className="text-center pb-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Review Your Booking
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Double check your session details before making payment.
          </p>
        </div>

        {/* Summary Card */}
        <SummaryCard summary={summary} />
      </div>
    </main>
  );
}
