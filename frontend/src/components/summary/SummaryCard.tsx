import { MapPin } from "lucide-react";
import BookingDetails from "./BookingDetails";
import PaymentInfo from "./PaymentInfo";
import PricingSection from "./PricingSection";
import { BookingSummary } from "@/src/domain/booking";

interface Props {
  summary: BookingSummary;
}

export default function SummaryCard({ summary }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Venue Info */}
      <div className="p-6 space-y-2">
        <span className="inline-block rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          Booking Summary
        </span>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          ZenPilates Studio
        </h2>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={16} />
          <span>Jl. Senopati No. 12, Kebayoran Baru</span>
        </div>
      </div>

      <div className="mx-6 h-px bg-slate-200 dark:bg-slate-800" />

      <BookingDetails summary={summary} />
      <PricingSection summary={summary} />
      <PaymentInfo
        reservationId={summary.id}
        amount={summary.base_price}
        email={summary.user.email}
        name={summary.user.name}
      />
    </div>
  );
}
