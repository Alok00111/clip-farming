"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 font-sans selection:bg-accent selection:text-background">
      {/* Outer Grid Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[100rem]">
        
        {/* Top Grid Border */}
        <div className="border-t-2 border-border/60 w-full mb-12"></div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-l-2 border-border/60">
          
          <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-r-2 border-b-2 border-border/60 hover:bg-muted/10 transition-colors duration-500">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs md:text-sm font-mono tracking-[0.2em] text-accent mb-8 uppercase font-bold"
            >
              [SYS.LOG] About Us — The Agency
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              WE ENGINEER<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground">ATTENTION.</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-4 flex flex-col border-r-2 border-border/60">
            <div className="flex-1 p-8 md:p-12 lg:p-16 border-b-2 border-border/60 hover:bg-accent hover:text-accent-foreground transition-all duration-500 group flex flex-col justify-center">
              <span className="text-sm font-mono tracking-widest opacity-50 block mb-4 group-hover:opacity-100 font-bold">DATA.PT.01</span>
              <span className="font-display text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter block group-hover:scale-105 transition-transform origin-left">600M+</span>
              <span className="text-xl font-bold uppercase tracking-widest mt-4 block">Views Generated</span>
            </div>
            <div className="flex-1 p-8 md:p-12 lg:p-16 border-b-2 border-border/60 hover:bg-foreground hover:text-background transition-all duration-500 group flex flex-col justify-center">
              <span className="text-sm font-mono tracking-widest opacity-50 block mb-4 group-hover:opacity-100 font-bold">DATA.PT.02</span>
              <span className="font-display text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter block group-hover:scale-105 transition-transform origin-left">4,000+</span>
              <span className="text-xl font-bold uppercase tracking-widest mt-4 block text-muted-foreground group-hover:text-background/80">Active Clippers</span>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-l-2 border-border/60">
          <div className="lg:col-span-4 p-8 md:p-16 lg:p-24 border-r-2 border-b-2 border-border/60 bg-muted/20">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight sticky top-40">
              The<br/>Philosophy
            </h2>
          </div>
          <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-r-2 border-b-2 border-border/60 text-xl md:text-3xl lg:text-4xl font-bold leading-tight text-muted-foreground/70">
            <p className="mb-12 hover:text-foreground transition-colors duration-300">
              Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
            </p>
            <p className="mb-12 hover:text-foreground transition-colors duration-300">
              We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
            </p>
            <p className="hover:text-foreground transition-colors duration-300">
              Scaling high-retention content isn't done on spreadsheets. We utilize brutal, data-driven workflows and continuous A/B testing to ensure every second maximizes watch time.
            </p>
          </div>
        </div>

        {/* Marquee Row */}
        <div className="border-l-2 border-r-2 border-b-2 border-border/60 overflow-hidden relative flex items-center bg-foreground text-background py-8">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-8 font-mono text-xl md:text-2xl font-bold uppercase tracking-widest">
                RETENTION EDITING • SUBLIMINAL SOUND DESIGN • MILLISECOND PACING • VIRAL ENGINEERING • 
              </span>
            ))}
          </motion.div>
        </div>

        {/* Architectural Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-l-2 border-border/60">
          <div className="lg:col-span-12 p-8 md:p-12 border-r-2 border-b-2 border-border/60 bg-muted/10 flex items-center justify-between">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest">Timeline / Milestones</h2>
            <span className="font-mono text-sm font-bold text-accent">LATEST.DATA</span>
          </div>
          
          {[
            { year: "2026", event: "The Inception", desc: "Recognized the massive gap between traditional editing and the aggressive retention requirements of modern algorithms." },
            { year: "2026", event: "Assembling The Fleet", desc: "Started aggressively vetting and onboarding elite short-form specialists who understand pacing and psychology." }
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div className="lg:col-span-4 p-8 md:p-16 lg:p-24 border-r-2 border-b-2 border-border/60 flex items-center justify-center group hover:bg-accent transition-colors duration-500">
                <span className="font-display text-7xl md:text-8xl lg:text-9xl font-black text-transparent [-webkit-text-stroke:2px_var(--border)] group-hover:[-webkit-text-stroke:2px_var(--background)] group-hover:text-background transition-all duration-500">{step.year}</span>
              </div>
              <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-r-2 border-b-2 border-border/60 flex flex-col justify-center hover:bg-muted/5 transition-colors">
                <span className="text-sm font-mono tracking-widest text-accent mb-6 uppercase font-bold">Phase 0{i + 1}</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-foreground mb-8">{step.event}</h3>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl">{step.desc}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* The Architects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-l-2 border-b-2 border-border/60 mb-32">
          <div className="lg:col-span-12 p-8 md:p-12 border-r-2 border-b-2 border-border/60 bg-muted/10 flex items-center justify-between">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest">The Architects</h2>
            <span className="font-mono text-sm font-bold text-accent">TEAM.ROSTER</span>
          </div>

          {[
            { name: "Agent 01", role: "Head of Strategy", id: "001" },
            { name: "Agent 02", role: "Chief Pacing", id: "002" },
            { name: "Agent 03", role: "VFX & Sound", id: "003" },
            { name: "Agent 04", role: "Network Dir.", id: "004" }
          ].map((member, i) => (
            <div key={i} className="lg:col-span-3 p-8 md:p-12 border-r-2 border-border/60 flex flex-col items-start justify-between min-h-[400px] group hover:bg-foreground transition-all duration-500">
              <span className="text-sm font-mono tracking-widest text-muted-foreground group-hover:text-background/50 uppercase font-bold">OP.{member.id}</span>
              
              <div className="w-full aspect-[4/5] border-2 border-border/60 my-8 flex items-center justify-center overflow-hidden bg-muted/20 group-hover:border-background/20 group-hover:bg-background/10 transition-colors">
                <span className="font-display text-5xl font-black text-muted-foreground/30 group-hover:text-accent group-hover:scale-110 transition-all duration-500">{member.name.split(' ')[1]}</span>
              </div>

              <div className="w-full">
                <h3 className="font-display text-3xl font-black uppercase text-foreground group-hover:text-background transition-colors">{member.name}</h3>
                <div className="h-1 w-full bg-border/40 my-4 group-hover:bg-background/20 transition-colors"></div>
                <p className="text-sm font-bold text-accent uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
