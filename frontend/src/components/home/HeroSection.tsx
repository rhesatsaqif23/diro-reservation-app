import React from "react";
import { MapPin } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="container-page py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Hero Image */}
        <div className="relative w-full overflow-hidden rounded-xl lg:w-1/2 aspect-4/3 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-multiply z-10"></div>
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3FXJd2pAHlmS8cDxkhKe_Jdszi98Gzdx0twx0NTll_wijfbboL987bAKwlZmWCLFvZSsbx58A-jG6yywR2Nl2Zwz5bid5Cx6Vl5Q7GDbK3IRcxW_6Xs1iJJIQjAsXKFAMMg-3tJ6XwEd9myanSQe6hdzanH3EYPQOLSsxxiUiBrRjETCIY_VzXQ6NrUJfCI3bKOkCb6pqcahqokCamqXl6wgDiRa_Pt_uReDmlyoPYOcFfn2uEM7RbF3W0UqWus-sf8vSpmCakXs')",
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary">
              <MapPin size={16} strokeWidth={2} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Jakarta
              </span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              ZenPilates Studio
            </h1>
            <p className="max-w-lg text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              Escape the noise of the city. Re-center your body and mind in our
              serene, state-of-the-art sanctuary.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              Book a Class Now
            </Button>

            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
