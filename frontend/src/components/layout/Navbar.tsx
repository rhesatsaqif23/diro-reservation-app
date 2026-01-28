"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MdSelfImprovement } from "react-icons/md";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
import AuthCard from "../auth/AuthCard";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";
import { logout as apiLogout } from "@/src/services/auth.service";
import { useMounted } from "@/src/hooks/useMounted";

export default function Navbar() {
  const mounted = useMounted();
  const { isAuthenticated, logout } = useAuthStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!mounted) return null;

  const handleLogout = () => {
    apiLogout();
    logout();
    setIsMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
        <div className="container-page flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-105">
              <MdSelfImprovement size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              ZenPilates
            </h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/classes" className="nav-link">
              Explore Class
            </Link>

            <Link href="/history" className="nav-link">
              Booking History
            </Link>

            <ThemeToggle />

            {isAuthenticated ? (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="rounded-full"
                onClick={() => setIsAuthOpen(true)}
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="md:hidden text-slate-900 dark:text-white"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
            <div className="container-page flex flex-col gap-4 py-6">
              <Link
                href="/classes"
                className="text-base font-medium text-slate-900 dark:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Explore Class
              </Link>
              <Link
                href="/bookings"
                className="text-base font-medium text-slate-900 dark:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Booking History
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="rounded-full"
                  onClick={() => setIsAuthOpen(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthCard open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
