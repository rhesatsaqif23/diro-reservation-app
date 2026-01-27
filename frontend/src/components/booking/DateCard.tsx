"use client";
import clsx from "clsx";

interface DateCardProps {
  date: string;
  label: string;
  disabled?: boolean;
  active?: boolean;
  onSelect?: (date: string) => void;
}

export function DateCard({
  date,
  label,
  disabled,
  active,
  onSelect,
}: DateCardProps) {
  const d = new Date(date);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(date)}
      className={clsx(
        "flex flex-col min-w-25 h-24 items-center justify-center gap-1 rounded-2xl transition-colors",
        "border-2",
        active
          ? "border-primary bg-primary text-white"
          : "border-slate-200 hover:border-primary",
        disabled &&
          "opacity-40 cursor-not-allowed bg-gray-200/20 hover:border-slate-200",
      )}
    >
      <p className="text-xs font-bold uppercase tracking-widest">
        {d.toLocaleString("en", { month: "short" })}
      </p>
      <p className="text-2xl font-black">{d.getDate()}</p>
      <p className="text-xs font-medium">
        {d.toLocaleDateString("en-US", { weekday: "short" })}
      </p>
    </button>
  );
}
