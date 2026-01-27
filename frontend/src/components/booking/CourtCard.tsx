"use client";

import clsx from "clsx";
import { Court } from "@/src/domain/court";
import { Armchair, Lock } from "lucide-react";

interface CourtCardProps {
  court: Court;
  selected?: boolean;
  onClick?: () => void;
}

export function CourtCard({
  court,
  selected = false,
  onClick,
}: CourtCardProps) {
  const isAvailable = court.is_available;

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={onClick}
      className={clsx(
        "relative flex w-full items-center gap-5 p-5 rounded-2xl text-left transition-colors",
        "bg-white dark:bg-[#1a1d2d]",
        "border-2",
        selected ? "border-primary" : "border-slate-200 hover:border-primary",
        !isAvailable && "opacity-60 cursor-not-allowed hover:border-slate-200",
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          "shrink-0 size-20 rounded-xl flex items-center justify-center",
          selected
            ? "bg-primary/10 text-primary"
            : isAvailable
              ? "bg-slate-400/20 text-slate-400"
              : "bg-slate-400/10 text-slate-400",
        )}
      >
        {isAvailable ? (
          <Armchair size={36} strokeWidth={1.8} />
        ) : (
          <Lock size={32} strokeWidth={1.8} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-bold">{court.name}</p>
          <p className="text-sm text-slate-500">{court.type}</p>

          {selected && (
            <p className="text-sm text-primary font-bold mt-2">Selected</p>
          )}
        </div>

        <span
          className={clsx(
            "px-2 py-0.5 rounded text-xs font-bold uppercase",
            isAvailable
              ? "bg-green-100 text-green-600"
              : "bg-red-50 text-red-400",
          )}
        >
          {isAvailable ? "Available" : "Reserved"}
        </span>
      </div>
    </button>
  );
}
