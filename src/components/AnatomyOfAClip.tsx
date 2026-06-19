"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Volume2, Sparkles, Crosshair, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "The 3-Second Hook",
    description: "Psychological pattern interrupts designed to stop the scroll instantly.",
    icon: Crosshair,
    position: "top-[15%] left-[-10%] md:left-[-30%]",
    align: "text-right md:items-end",
  },
  {
    title: "Hyper-Stimulating B-Roll",
    description: "Constant visual changes every 2 seconds to retain attention.",
    icon: Sparkles,
    position: "top-[40%] right-[-10%] md:right-[-30%]",
    align: "text-left md:items-start",
  },
  {
    title: "Subliminal Sound Design",
    description: "Layered SFX and trending audio tracks to engineer emotion.",
    icon: Volume2,
    position: "top-[65%] left-[-10%] md:left-[-30%]",
    align: "text-right md:items-end",
  },
  {
    title: "Algorithmic Swarm",
    description: "Optimized metadata pushed across 3000+ burner accounts.",
    icon: TrendingUp,
    position: "bottom-[10%] right-[-10%] md:right-[-30%]",
    align: "text-left md:items-start",
  },
];

export default function AnatomyOfAClip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-32 z-10 overflow-visible">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl">
            The Viral <span className="text-accent">Anatomy.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            How we engineer millions of views predictably. Every clip is mathematically optimized for maximum retention.
          </p>
        </motion.div>

        {/* Central Phone/Video Mockup */}
        <div className="relative mx-auto mt-16 max-w-[300px] sm:max-w-[350px] aspect-[9/16]">
          
          {/* Glassmorphic Phone Frame (Transparent to let ambient light through) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute inset-0 rounded-[3rem] border border-white/20 bg-background/30 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col justify-center items-center group"
          >
            {/* Play Button Indicator */}
            <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                <Play className="h-8 w-8 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Fake Video UI Overlays */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
              <div className="w-2/3 h-4 rounded-full bg-white/20" />
              <div className="w-1/2 h-3 rounded-full bg-white/10" />
            </div>
            <div className="absolute right-4 bottom-32 flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm" />
              ))}
            </div>
          </motion.div>

          {/* Glowing Nodes & Lines */}
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2 }}
                className={cn("absolute w-[250px] md:w-[320px] flex flex-col gap-2", feature.position, feature.align)}
              >
                {/* Connector Line & Dot */}
                <div className={cn(
                  "absolute top-6 h-[1px] bg-accent/50 w-20 md:w-32 hidden md:block",
                  idx % 2 === 0 ? "right-[-32px]" : "left-[-32px]"
                )}>
                  <div className={cn(
                    "absolute top-[-4px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(249,115,22,1)]",
                    idx % 2 === 0 ? "right-0" : "left-0"
                  )} />
                </div>

                <div className="flex items-center gap-3">
                  {idx % 2 !== 0 && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground bg-background/50 backdrop-blur-sm px-2 rounded-md">{feature.title}</h3>
                  {idx % 2 === 0 && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-2 rounded-md py-1 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
