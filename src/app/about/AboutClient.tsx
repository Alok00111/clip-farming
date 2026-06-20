"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-32 font-sans selection:bg-accent selection:text-background">
      
      {/* Elegant Hero */}
      <section className="container mx-auto px-6 max-w-5xl text-center pt-0 pb-24 md:pt-4 md:pb-32">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent font-bold uppercase tracking-[0.3em] text-sm mb-6"
        >
          Who We Are
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-10"
        >
          We don't just edit videos. <br className="hidden md:block" />
          <span className="text-muted-foreground">We engineer attention.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
        </motion.p>
      </section>

      {/* The Stats Grid */}
      <section className="bg-foreground text-background py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-12 bg-background/5 rounded-3xl"
            >
              <h3 className="font-display text-7xl md:text-8xl font-black text-accent mb-4 tracking-tighter">600M+</h3>
              <p className="text-lg md:text-xl font-medium uppercase tracking-[0.2em] opacity-80">Views Generated</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center p-12 bg-background/5 rounded-3xl"
            >
              <h3 className="font-display text-7xl md:text-8xl font-black text-accent mb-4 tracking-tighter">4,000+</h3>
              <p className="text-lg md:text-xl font-medium uppercase tracking-[0.2em] opacity-80">Active Clippers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-6 max-w-4xl text-center py-32">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-10 text-foreground">The Philosophy</h2>
        <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed">
          <p>
            We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
          </p>
          <p>
            Scaling high-retention content isn't done on spreadsheets. We utilize proprietary, data-driven workflows and continuous A/B testing to ensure every second maximizes watch time.
          </p>
        </div>
      </section>

      {/* The Centered Journey (Timeline) */}
      <section className="container mx-auto px-6 max-w-5xl py-24">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Our Journey</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-8"></div>
        </div>

        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -ml-[0.5px]"></div>

          <div className="space-y-16 md:space-y-32">
            {[
              { year: "2026", event: "The Inception", desc: "Recognized the massive gap between traditional editing and the aggressive retention requirements of modern algorithms.", align: "left" },
              { year: "2026", event: "Assembling The Fleet", desc: "Started aggressively vetting and onboarding elite short-form specialists who understand pacing and psychology.", align: "right" }
            ].map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Dot */}
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-accent rounded-full -ml-2 outline outline-8 outline-background"></div>

                <div className={`w-full md:w-1/2 ${step.align === 'left' ? 'md:pr-24 text-center md:text-right' : 'md:pl-24 text-center md:text-left'} mb-8 md:mb-0`}>
                  <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm block mb-4">{step.year}</span>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">{step.event}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>

                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Architects (Team) */}
      <section className="container mx-auto px-6 max-w-6xl py-32">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">The Architects</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { name: "Agent 01", role: "Head of Strategy" },
            { name: "Agent 02", role: "Chief Pacing" },
            { name: "Agent 03", role: "VFX & Sound" },
            { name: "Agent 04", role: "Network Dir." }
          ].map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="w-full aspect-[4/5] bg-muted/30 rounded-2xl mb-8 flex items-center justify-center transition-colors duration-300 group-hover:bg-muted/50">
                <span className="font-display text-4xl text-muted-foreground/30 font-bold">{member.name.split(' ')[1]}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{member.name}</h3>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
