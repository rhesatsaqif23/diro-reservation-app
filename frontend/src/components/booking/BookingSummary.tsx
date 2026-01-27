"use client";

import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { Court } from "@/src/domain/court";
import { TimeslotAvailability } from "@/src/domain/timeslot";

interface BookingSummaryCardProps {
  date: string | null;
  timeslot: TimeslotAvailability | null;
  court: Court | null;
  amount?: string;
  onConfirm?: () => void;
  isAuthenticated: boolean;
}

export function BookingSummaryCard({
  date,
  timeslot,
  court,
  amount,
  onConfirm,
  isAuthenticated,
}: BookingSummaryCardProps) {
  if (!date || !timeslot || !court) return null; // hide if incomplete

  return (
    <div
      className={clsx(
        "mt-8 mx-4 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative transition-colors",
        "bg-white dark:bg-[#1a1d2d]",
        "text-slate-900 dark:text-white",
      )}
    >
      {/* Background Gradient */}
      <div
        className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, #304fe8 0%, transparent 70%)",
        }}
      ></div>

      {/* Left Info */}
      <div className="flex flex-col gap-2 relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Your Selection
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-60" />
            <p className="text-lg font-bold">{new Date(date).toDateString()}</p>
          </div>

          {/* Timeslot */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-60" />
            <p className="text-lg font-bold">{timeslot.start_time}</p>
          </div>

          {/* Court */}
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="w-4 h-4" />
            <p className="text-lg font-bold">{court.name}</p>
          </div>
        </div>
      </div>

      {/* Right Info */}
      <div className="flex items-center gap-8 relative z-10">
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
            Total Amount
          </p>
          <p className="text-3xl font-black">{amount}</p>
        </div>

        <button
          disabled={!isAuthenticated}
          onClick={onConfirm}
          className="flex items-center justify-center gap-2 px-10 h-14 bg-primary hover:bg-primary/90 rounded-2xl text-white font-bold transition-transform active:scale-95 shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAuthenticated ? "Confirm Booking" : "Login to Continue"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
