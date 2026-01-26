"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthToggle from "./AuthToggle";
import AuthTextField from "./AuthTextField";
import Button from "../ui/Button";

interface AuthCardProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthCard({ open, onClose }: AuthCardProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* card */}
      <div className="relative w-full max-w-120 rounded-xl bg-white dark:bg-[#1c2136] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {mode === "login" ? "Welcome Back" : "Join ZenPilates"}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {mode === "login"
              ? "Find your balance with ZenPilates."
              : "Create your account and start your journey."}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-8">
          <AuthToggle value={mode} onChange={setMode} />
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {mode === "register" && (
            <AuthTextField
              label="Full Name"
              placeholder="Enter your name"
              icon={<User size={18} />}
              value={name}
              onChange={setName}
            />
          )}

          <AuthTextField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            value={email}
            onChange={setEmail}
          />

          <AuthTextField
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={password}
            onChange={setPassword}
          />

          <Button>{mode === "login" ? "Sign In" : "Create Account"}</Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          {mode === "login" ? "Don't have an account?" : "Already a member?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-primary font-bold hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
