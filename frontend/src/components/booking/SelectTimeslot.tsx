"use client";

import { TimeslotAvailability } from "@/src/domain/timeslot";
import { TimeslotButton } from "./TimeslotButton";

interface SelectTimeslotProps {
  timeslots: TimeslotAvailability[];
  selected: TimeslotAvailability | null;
  onChange: (slot: TimeslotAvailability | null) => void;
}

const isMorning = (time: string) => Number(time.split(":")[0]) < 12;

export function SelectTimeslot({
  timeslots,
  selected,
  onChange,
}: SelectTimeslotProps) {
  const grouped = {
    morning: timeslots.filter((t) => isMorning(t.start_time)),
    afternoon: timeslots.filter((t) => !isMorning(t.start_time)),
  };

  const handleSelect = (slot: TimeslotAvailability) => {
    onChange(selected?.start_time === slot.start_time ? null : slot);
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 px-4">
        <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          2
        </span>
        <h3 className="text-xl font-bold">Select Timeslot</h3>
      </div>

      {/* Sections */}
      {[
        { label: "Morning Sessions", data: grouped.morning },
        { label: "Afternoon Sessions", data: grouped.afternoon },
      ].map(
        ({ label, data }) =>
          data.length > 0 && (
            <div key={label} className="px-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {data.map((slot) => (
                  <TimeslotButton
                    key={slot.start_time}
                    label={slot.start_time}
                    disabled={!slot.available}
                    selected={selected?.start_time === slot.start_time}
                    onClick={() => handleSelect(slot)}
                  />
                ))}
              </div>
            </div>
          ),
      )}
    </section>
  );
}
