import React from "react";
import { Users, Dumbbell, Sparkles } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Our certified trainers provide personalized attention to help you reach your physical goals safely.",
  },
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description:
      "Train on premium Peak Pilates reformers and specialized props designed for maximum efficiency.",
  },
  {
    icon: Sparkles,
    title: "Peaceful Space",
    description:
      "A minimalist sanctuary designed with natural light to help you find mental clarity.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white/50 dark:bg-slate-900/50 py-20">
      <div className="container-page">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Experience the Zen
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Discover why our community chooses ZenPilates for their daily
              wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
