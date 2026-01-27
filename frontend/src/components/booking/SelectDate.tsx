"use client";

import { DateCard } from "./DateCard";

interface SelectDateProps {
  dates: {
    date: string;
    label: string;
    disabled?: boolean;
  }[];
  selected: string | null;
  loading?: boolean;
  onChange: (date: string | null) => void;
}

export function SelectDate({
  dates,
  selected,
  loading = false,
  onChange,
}: SelectDateProps) {
  const handleSelect = (date: string) => {
    onChange(selected === date ? null : date);
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 px-4">
        <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          1
        </span>
        <h3 className="text-xl font-bold">Select Date</h3>
      </div>

      {/* Content */}
      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-16 rounded-xl bg-slate-200 animate-pulse"
            />
          ))}

        {!loading &&
          dates.map((d) => (
            <DateCard
              key={d.date}
              date={d.date}
              label={d.label}
              disabled={d.disabled}
              active={selected === d.date}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </section>
  );
}
