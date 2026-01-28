"use client";

type TabValue = "upcoming" | "past";

interface Props {
  value: TabValue;
  onChange: (v: TabValue) => void;
}

const TABS: { value: TabValue; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past Sessions" },
];

export default function HistoryTabs({ value, onChange }: Props) {
  return (
    <div className="flex border-b gap-8">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`pb-3 font-bold text-sm border-b-[3px] ${
            value === tab.value
              ? "border-primary text-primary"
              : "border-transparent text-slate-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
