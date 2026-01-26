"use client";

import { useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AuthCard from "../components/auth/AuthCard";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Navbar onLoginClick={() => setAuthOpen(true)} />

          <main className="flex-1">{children}</main>

          <Footer />

          {/* GLOBAL OVERLAY */}
          <AuthCard open={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
      </body>
    </html>
  );
}
