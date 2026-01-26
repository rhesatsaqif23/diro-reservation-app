import React from "react";
import { MdSelfImprovement } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-transparent py-12 transition-colors duration-300">
      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <MdSelfImprovement size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ZenPilates
            </span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contact Us
            </a>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 ZenPilates Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
