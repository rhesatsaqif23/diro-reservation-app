"use client";

import { Menu } from "lucide-react";
import { MdSelfImprovement } from "react-icons/md";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-4">
        {/* Logo */}
        <a className="flex items-center gap-3 group" href="#">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-105">
            <MdSelfImprovement size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            ZenPilates
          </h2>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a className="nav-link" href="#">
            Class Schedule
          </a>
          <a className="nav-link" href="#">
            Booking History
          </a>

          <ThemeToggle />

          <Button className="rounded-full px-8" onClick={onLoginClick}>
            Login
          </Button>
        </nav>

        {/* Mobile */}
        <button className="md:hidden text-slate-900 dark:text-white">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
