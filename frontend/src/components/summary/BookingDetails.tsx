import { BookingSummary } from "@/src/domain/booking";
import { Dumbbell, Calendar, Clock, Grid } from "lucide-react";

const Item = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold text-slate-900 dark:text-white">
      {value}
    </span>
  </div>
);

interface Props {
  summary: BookingSummary;
}

export default function BookingDetails({ summary }: Props) {
  return (
    <div className="p-6">
      <Item
        icon={<Dumbbell size={18} />}
        label="Class Type"
        value={summary.class.name}
      />

      <Item
        icon={<Calendar size={18} />}
        label="Date"
        value={new Date(summary.date).toDateString()}
      />

      <Item
        icon={<Clock size={18} />}
        label="Timeslot"
        value={`${summary.start_time} - ${summary.end_time}`}
      />

      <Item
        icon={<Grid size={18} />}
        label="Court"
        value={summary.court.name}
      />
    </div>
  );
}
