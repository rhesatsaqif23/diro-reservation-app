import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(
          // base
          "flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer active:scale-95 select-none",

          // size
          size === "md" && "h-12 px-6 text-sm",
          size === "lg" && "h-14 px-8 text-base",

          // variants
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-hover hover:shadow-xl",

          variant === "secondary" &&
            "bg-white text-primary hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",

          variant === "outline" &&
            "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",

          className,
        ),
      )}
    >
      {children}
    </button>
  );
}
