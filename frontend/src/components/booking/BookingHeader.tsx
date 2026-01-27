"use client";

interface BookingHeaderProps {
  title: string;
  subtitle: string;
}

export function BookingHeader({ title, subtitle }: BookingHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}
