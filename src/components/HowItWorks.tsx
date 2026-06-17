"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Search, Scissors, BarChart3 } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Search,
    title: "We Analyze",
    description: "Our team breaks down your long-form content, identifying the most engaging, high-retention moments that are primed for virality.",
  },
  {
    id: "02",
    icon: Scissors,
    title: "Clippers Create",
    description: "Our network of 7,000+ clippers edit, caption, and distribute these moments across TikTok, Reels, and Shorts simultaneously.",
  },
  {
    id: "03",
    icon: BarChart3,
    title: "You Track Results",
    description: "Watch your views skyrocket. You pay purely based on performance, guaranteeing ROI and massive organic growth.",
  },
];

// 3D Tilt Component
function TiltCard({ children, numberStr }: { children: React.ReactNode; numberStr: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full perspective-[1000px]"
    >
      <div 
        className="relative overflow-hidden rounded-3xl border-4 border-border bg-background p-10 transition-shadow duration-300 hover:shadow-[16px_16px_0px_0px_var(--border)]"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Massive Background Typography */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 z-0 select-none font-display text-[12rem] font-black leading-none text-foreground/[0.03] transition-all duration-500 group-hover:scale-110 group-hover:text-accent/10">
          {numberStr}
        </div>

        {/* Glare effect */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Actual Content */}
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="how-it-works" 
      ref={containerRef} 
      className="relative w-full py-32 overflow-hidden"
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
                      viewport={{ once: false, margin: "-50%" }}
                      transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                      className="h-8 w-8 rounded-full border-4 border-background bg-accent shadow-[0_0_15px_var(--accent)]"
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Content Card (Side Reveal + 3D Tilt) */}
                  <motion.div 
                    initial={{ x: isEven ? -150 : 150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className={`w-full md:w-1/2 z-10 ${isEven ? "md:pr-16" : "md:pl-16"}`}
                  >
                    <TiltCard numberStr={step.id}>
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="mb-4 font-display text-3xl font-bold uppercase text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </TiltCard>
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
