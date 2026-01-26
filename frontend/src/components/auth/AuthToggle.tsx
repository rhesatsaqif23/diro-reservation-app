"use client";

import clsx from "clsx";

interface AuthToggleProps {
  value: "login" | "register";
  onChange: (value: "login" | "register") => void;
}

export default function AuthToggle({ value, onChange }: AuthToggleProps) {
  return (
    <div className="relative flex h-12 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
      {/* Sliding Indicator */}
      <span
        className={clsx(
          "absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-white dark:bg-slate-900 shadow-sm transition-transform duration-300 ease-out",
          value === "login" ? "translate-x-0" : "translate-x-full",
        )}
      />

      <button
        type="button"
        onClick={() => onChange("login")}
        className={clsx(
          "relative z-10 flex-1 text-sm font-semibold transition-colors",
          value === "login"
            ? "text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400",
        )}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => onChange("register")}
        className={clsx(
          "relative z-10 flex-1 text-sm font-semibold transition-colors",
          value === "register"
            ? "text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400",
        )}
      >
        Register
      </button>
    </div>
  );
}
