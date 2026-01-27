import { Court } from "@/src/domain/court";
import { CourtCard } from "./CourtCard";

interface SelectCourtProps {
  courts: Court[];
  selected: Court | null;
  loading?: boolean;
  onChange: (court: Court | null) => void;
}

export function SelectCourt({
  courts,
  selected,
  loading = false,
  onChange,
}: SelectCourtProps) {
  const handleSelect = (court: Court) => {
    onChange(selected?.id === court.id ? null : court);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-4">
        <span className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          3
        </span>
        <h3 className="text-xl font-bold">Select Court</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-slate-200 animate-pulse"
            />
          ))}

        {!loading &&
          courts.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              selected={selected?.id === court.id}
              onClick={() => handleSelect(court)}
            />
          ))}
      </div>
    </section>
  );
}
