"use client";

import Image from "next/image";
import Button from "@/src/components/ui/Button";
import clsx from "clsx";
import { Class } from "@/src/domain/class";
import { resolveStorageImage } from "@/src/utils/image";
import { formatPrice } from "@/src/utils/format";

interface ClassCardProps {
  data: Class;
  popular?: boolean;
  onSelect?: (classId: string) => void;
  priorityImage?: boolean;
}

export default function ClassCard({
  data,
  popular = false,
  onSelect,
  priorityImage = false,
}: ClassCardProps) {
  return (
    <div
      className={clsx(
        "group relative flex w-full max-w-90 flex-col overflow-hidden rounded-xl",
        "bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800",
        "transition-all duration-300 hover:border-primary hover:shadow-xl hover:scale-[1.02]",
      )}
    >
      {/* Badge */}
      {popular && (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Most Popular
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={resolveStorageImage(data.image_url)}
          alt={data.name}
          fill
          priority={priorityImage}
          loading={priorityImage ? "eager" : "lazy"}
          fetchPriority={priorityImage ? "high" : "auto"}
          sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {data.name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-primary font-bold">
            <span>{formatPrice(data.price)}</span>
            <span className="text-sm font-normal text-slate-400">
              • {data.duration_minutes} Mins
            </span>
          </div>
        </div>

        {data.description && (
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {data.description}
          </p>
        )}

        <Button
          className="mt-auto w-full"
          variant="primary"
          onClick={() => onSelect?.(data.id)}
        >
          Select Class
        </Button>
      </div>
    </div>
  );
}
