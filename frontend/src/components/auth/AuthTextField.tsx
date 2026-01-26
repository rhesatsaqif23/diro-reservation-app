"use client";

import React from "react";

interface AuthTextFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export default function AuthTextField({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}: AuthTextFieldProps) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
        {label}
      </span>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            h-12 w-full rounded-xl border
            border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            pl-12 pr-4 text-base
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            transition-colors
            focus:outline-none
            focus:border-primary
            focus:ring-2 focus:ring-primary/20
            dark:focus:ring-primary/30
          "
        />
      </div>
    </label>
  );
}
