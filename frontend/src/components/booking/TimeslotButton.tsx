"use client";

import clsx from "clsx";

interface TimeslotButtonProps {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function TimeslotButton({
  label,
  disabled = false,
  selected = false,
  onClick,
}: TimeslotButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex h-12 items-center justify-center rounded-full text-sm font-bold transition-colors",
        "border-2",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-slate-200 hover:border-primary",
        disabled &&
          "bg-gray-200/20 text-gray-400 cursor-not-allowed hover:border-slate-200",
      )}
    >
      {label}
    </button>
  );
}
