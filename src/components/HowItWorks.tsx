"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Scissors, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. We Analyze",
    description: "Our team breaks down your long-form content, identifying the most engaging, high-retention moments that are primed for virality.",
  },
  {
    icon: Scissors,
    title: "2. Clippers Create",
    description: "Our network of 7,000+ clippers edit, caption, and distribute these moments across TikTok, Reels, and Shorts simultaneously.",
  },
  {
    icon: BarChart3,
    title: "3. You Track Results",
    description: "Watch your views skyrocket. You pay purely based on performance, guaranteeing ROI and massive organic growth.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // The glowing line scales down exactly with the scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="how-it-works" 
      ref={containerRef} 
      className="relative w-full py-32 bg-background overflow-hidden"
    >
      {/* Background Accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
        <div className="absolute left-[50%] top-[20%] h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
            The <span className="text-accent">Process.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We don't just edit videos. We engineer attention.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Neon Progress Line (Desktop Only) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 bg-neutral-900 md:block">
            <motion.div 
              className="absolute left-0 top-0 w-full bg-accent shadow-[0_0_15px_#D4FF00]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-40">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div 
                  key={index}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Central Node for the timeline */}
                  <div className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center md:flex z-20">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50%" }}
                      transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                      className="h-8 w-8 rounded-full border-4 border-background bg-accent shadow-[0_0_15px_#D4FF00]"
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Content Card (Side Reveal) */}
                  <motion.div 
                    initial={{ x: isEven ? -150 : 150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className={`w-full md:w-1/2 ${isEven ? "md:pr-16" : "md:pl-16"}`}
                  >
                    <div className="group relative overflow-hidden rounded-3xl border-4 border-border bg-neutral-950 p-10 transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--border)]">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="mb-4 font-display text-3xl font-bold uppercase text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
