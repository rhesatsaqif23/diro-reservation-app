import React from "react";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="container-page py-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-white md:px-16 md:py-24">
        {/* Abstract Background Decorations */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Ready to start your journey?
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-white/90">
              Join our community and feel the immediate difference in your
              body&#39;s strength and your mind&#39;s peace.
            </p>
          </div>
          <Button variant="secondary" size="lg">
            Book Your First Class
          </Button>
        </div>
      </div>
    </section>
  );
}
