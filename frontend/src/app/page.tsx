import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CTASection from "../components/home/CtaSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
}
