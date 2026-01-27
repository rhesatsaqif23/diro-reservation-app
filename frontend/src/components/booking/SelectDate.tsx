"use client";

import { DateCard } from "./DateCard";

interface SelectDateProps {
  dates: {
    date: string;
    label: string;
    disabled?: boolean;
  }[];
  selected: string | null;
  onChange: (date: string | null) => void;
}

export function SelectDate({ dates, selected, onChange }: SelectDateProps) {
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

      {/* Dates */}
      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
        {dates.map((d) => (
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
