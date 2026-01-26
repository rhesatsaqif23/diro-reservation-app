"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Sync DOM + localStorage when state changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Toggle theme"
      className="
        relative flex h-10 w-16 items-center
        rounded-full border border-border-subtle
        bg-slate-200 dark:bg-slate-700
        transition-colors duration-300
      "
    >
      {/* Thumb */}
      <span
        className={`
          absolute left-1 top-1 flex h-8 w-8 items-center justify-center
          rounded-full bg-white dark:bg-slate-900
          text-slate-700 dark:text-slate-200
          shadow transition-transform duration-300
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
