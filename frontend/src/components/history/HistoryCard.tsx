"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";
import Button from "@/src/components/ui/Button";
import { ReservationHistory } from "@/src/domain/reservationHistory";
import { resolveStorageImage } from "@/src/utils/image";

const statusStyle: Record<
  ReservationHistory["status"],
  { label: string; className: string }
> = {
  PAID: {
    label: "PAID",
    className: "bg-green-100 text-green-800",
  },
  PENDING: {
    label: "PENDING",
    className: "bg-yellow-100 text-yellow-800",
  },
  CANCELLED: {
    label: "CANCELLED",
    className: "bg-slate-200 text-slate-700",
  },
};

interface Props {
  reservation: ReservationHistory;
}

export default function HistoryCard({ reservation }: Props) {
  const router = useRouter();
  const status = statusStyle[reservation.status];

  const price =
    typeof reservation.class?.price === "number"
      ? `Rp${reservation.class.price.toLocaleString("id-ID")}`
      : "—";

  const imageSrc = resolveStorageImage(reservation.class?.image_url);

  const isPending = reservation.status === "PENDING";

  const handleAction = () => {
    if (isPending) {
      router.push(`/booking/summary/${reservation.id}`);
    } else {
      router.push(`/success?reservation_id=${reservation.id}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col flex-1 gap-5">
        {/* Status */}
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${status.className}`}
          >
            {status.label}
          </span>
          <span className="text-sm text-slate-500">
            #{reservation.id.slice(0, 8)}
          </span>
        </div>

        {/* Class */}
        <h3 className="text-2xl font-black">
          {reservation.class?.name ?? "Class not available"}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {reservation.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            {reservation.start_time}
          </div>

          {reservation.court && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {reservation.court.name}
            </div>
          )}
        </div>

        {/* Price */}
        <p className="text-xl font-black text-primary">{price}</p>

        {/* Action */}
        <Button onClick={handleAction} className="w-fit">
          {isPending ? "Continue Payment" : "View Detail"}
        </Button>
      </div>

      {reservation.class?.image_url && (
        <div className="relative w-full md:w-56 h-44 rounded-xl overflow-hidden group">
          <Image
            src={imageSrc}
            alt={reservation.class?.name ?? "Class image"}
            fill
            priority={false}
            loading="lazy"
            fetchPriority="auto"
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}
