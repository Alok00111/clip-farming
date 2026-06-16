"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, Scissors, BarChart3 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const pathProgress = useMotionValue(0);

  useGSAP(() => {
    // Only run horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        const sections = gsap.utils.toArray(".step-card");
        return -(window.innerWidth * (sections.length - 1));
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            pathProgress.set(self.progress);
          }
        }
      });

      // Move cards horizontally
      tl.to(scrollWrapperRef.current, {
        x: getScrollAmount,
        ease: "none",
      }, 0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="how-it-works" 
      ref={containerRef} 
      className="relative flex h-screen w-full items-center overflow-hidden bg-background"
    >
      {/* Background Accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
        <div className="absolute -left-[10%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-accent blur-[120px]" />
      </div>

      {/* Custom Horizontal Circuit Board (Desktop Only) */}
      <svg 
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        {/* Bright Glowing Track (Dynamically drawn by scroll) */}
        <motion.path
          d="M 0 250 C 50 250, 80 230, 100 250 S 150 270, 200 250 S 230 150, 250 100 S 280 50, 300 150 S 350 400, 400 350 S 450 250, 500 250 S 600 230, 700 250 S 750 100, 800 50 S 850 300, 900 250 S 950 250, 1000 250"
          fill="transparent"
          stroke="#D4FF00"
          strokeWidth="3"
          style={{ 
            pathLength: pathProgress,
            filter: "drop-shadow(0 0 8px #D4FF00)" 
          }}
        />
      </svg>

      <div className="container relative z-10 mx-auto px-6 md:hidden">
        <h2 className="mb-12 font-display text-4xl font-bold uppercase tracking-tight text-foreground">
          How It <span className="text-accent">Works</span>
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/50 p-8 shadow-brutal">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <step.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Horizontal Scroll Container */}
      <div 
        ref={scrollWrapperRef} 
        className="hidden md:flex h-full w-max items-center"
      >
        {/* Intro Slide */}
        <div className="step-card flex h-full w-screen shrink-0 items-center justify-center px-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-7xl font-bold uppercase tracking-tight text-foreground">
              The <span className="text-accent">Process</span>
            </h2>
            <p className="mt-6 text-2xl text-muted-foreground">
              Scroll to see how we turn your raw footage into millions of verified views.
            </p>
          </div>
        </div>

        {/* The 3 Steps */}
        {steps.map((step, i) => (
          <div key={i} className="step-card flex h-full w-screen shrink-0 items-center justify-center px-16">
            <div className="flex max-w-2xl flex-col gap-8 rounded-3xl border border-border bg-muted/50 p-16 shadow-brutal backdrop-blur-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <step.icon className="h-10 w-10 text-accent" />
              </div>
              <h3 className="font-display text-5xl font-bold text-foreground">{step.title}</h3>
              <p className="text-xl leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
