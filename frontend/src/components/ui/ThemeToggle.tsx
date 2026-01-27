"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(shouldBeDark);
    setMounted(true);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Fungsi toggle diletakkan langsung di onClick
  const handleToggle = () => {
    setIsDark((prev) => {
      const newState = !prev;
      if (newState) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newState;
    });
  };

  // Render placeholder transparan agar Navbar tidak lompat (Layout Shift)
  if (!mounted) return <div className="h-10 w-16" />;

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative flex h-10 w-16 items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-700 transition-colors duration-300"
    >
      <div
        className={`
          absolute left-1 top-1 flex h-8 w-8 items-center justify-center
          rounded-full bg-white dark:bg-slate-900
          text-slate-700 dark:text-slate-200
          shadow transition-transform duration-300
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </div>
    </button>
  );
}
