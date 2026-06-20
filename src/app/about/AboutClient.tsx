"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const Marquee = () => (
  <motion.div 
    variants={itemVariants}
    className="relative my-32 flex w-full flex-col items-center justify-center overflow-hidden bg-foreground py-10"
  >
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 25, repeat: Infinity }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="mx-8 font-display text-5xl font-black uppercase tracking-widest text-background sm:text-7xl">
          RETENTION EDITING • SUBLIMINAL SOUND DESIGN • MILLISECOND PACING • VIRAL ENGINEERING • 
        </span>
      ))}
    </motion.div>
  </motion.div>
);

export default function AboutClient() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-40 pb-32 overflow-x-hidden"
    >
      <div className="container mx-auto px-6 max-w-[90rem]">
        
        {/* Ultra-Minimal Hero */}
        <motion.div variants={itemVariants} className="max-w-7xl mb-32">
          <h1 className="font-display text-7xl font-black uppercase tracking-tighter text-foreground sm:text-8xl lg:text-[11rem] leading-[0.85]">
            WE DON'T<br/>EDIT VIDEOS.<br/>
            <span className="text-muted-foreground">WE ENGINEER</span><br/>
            <span className="text-accent underline decoration-foreground underline-offset-[1rem]">ATTENTION.</span>
          </h1>
        </motion.div>

        {/* Philosophy (Asymmetric Sticky Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 my-40">
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <h2 className="font-display text-6xl font-black uppercase text-foreground">The<br/>Philosophy</h2>
              <div className="mt-8 w-20 h-2 bg-accent"></div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-12 font-display text-3xl sm:text-4xl font-bold uppercase text-muted-foreground leading-tight tracking-tight">
            <p className="hover:text-foreground transition-colors duration-300">
              Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
            </p>
            <p className="hover:text-foreground transition-colors duration-300">
              We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
            </p>
            <p className="hover:text-foreground transition-colors duration-300">
              Scaling high-retention content isn't done on spreadsheets. We utilize brutal, data-driven workflows and continuous A/B testing to ensure every second maximizes watch time.
            </p>
          </motion.div>
        </div>

      </div>

      <Marquee />

      {/* Full-Width Stat Block */}
      <motion.div variants={itemVariants} className="w-full bg-foreground py-32 px-6">
        <div className="container mx-auto max-w-[90rem] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 text-center md:text-left">
          <div className="flex flex-col border-b-4 md:border-b-0 md:border-r-4 border-muted/20 pb-16 md:pb-0 md:pr-16">
            <span className="font-display text-[8rem] sm:text-[12rem] font-black leading-none text-accent">4K+</span>
            <span className="font-display text-3xl font-bold uppercase tracking-widest text-background mt-4">Active Clippers</span>
          </div>
          <div className="flex flex-col md:pl-8 justify-center">
            <span className="font-display text-[8rem] sm:text-[12rem] font-black leading-none text-accent">600M+</span>
            <span className="font-display text-3xl font-bold uppercase tracking-widest text-background mt-4">Views Generated</span>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 max-w-[90rem]">
        
        {/* Minimalist Timeline */}
        <div className="my-40 max-w-6xl">
          <motion.h2 variants={itemVariants} className="font-display text-6xl font-black uppercase text-foreground mb-24">The Timeline</motion.h2>
          
          <div className="flex flex-col divide-y-4 divide-border border-y-4 border-border">
            {[
              { year: "2026", event: "The Inception", desc: "Recognized the massive gap between traditional editing and the aggressive retention requirements of modern algorithms." },
              { year: "2026", event: "Assembling The Fleet", desc: "Started aggressively vetting and onboarding elite short-form specialists who understand pacing and psychology." }
            ].map((step, i) => (
              <motion.div key={step.event} variants={itemVariants} className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 group hover:bg-muted/10 transition-colors">
                <div className="md:col-span-3">
                  <span className="font-display text-7xl font-black text-foreground group-hover:text-accent transition-colors">{step.year}</span>
                </div>
                <div className="md:col-span-9 flex flex-col justify-center">
                  <h3 className="font-display text-4xl font-black uppercase text-foreground mb-4">{step.event}</h3>
                  <p className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brutalist Team Roster */}
        <div className="my-40 max-w-6xl">
          <motion.h2 variants={itemVariants} className="font-display text-6xl font-black uppercase text-foreground mb-16">The Architects</motion.h2>
          
          <div className="flex flex-col border-t-4 border-foreground">
            {[
              { name: "Agent 01", role: "Head of Strategy" },
              { name: "Agent 02", role: "Chief Pacing" },
              { name: "Agent 03", role: "VFX & Sound" },
              { name: "Agent 04", role: "Network Dir." }
            ].map((member, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between py-12 border-b-4 border-foreground group cursor-crosshair">
                <h3 className="font-display text-5xl sm:text-7xl font-black uppercase text-foreground group-hover:pl-8 transition-all duration-300">{member.name}</h3>
                <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors mt-4 sm:mt-0">{member.role}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
