"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-foreground mb-8">
            About Us
          </h1>
          <div className="space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
            <p>
              We don't just edit videos. We engineer attention. 
            </p>
            <p>
              By combining data-driven workflows, aggressive retention strategies, and a proprietary network of over 4,000 elite clippers, we have generated over 600 million views for our partners.
            </p>
            <p>
              We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-24"
        >
          <h2 className="font-display text-3xl font-bold uppercase text-foreground border-b-2 border-border pb-4 mb-8">
            Our Journey
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">2026: The Inception</h3>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">Recognized the massive gap between traditional editing and the aggressive retention requirements of modern algorithms.</p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">2026: Assembling The Fleet</h3>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">Started aggressively vetting and onboarding elite short-form specialists who understand pacing and psychology.</p>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-3xl font-bold uppercase text-foreground border-b-2 border-border pb-4 mb-8">
            The Architects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Agent 01", role: "Strategy" },
              { name: "Agent 02", role: "Pacing" },
              { name: "Agent 03", role: "VFX & Sound" },
              { name: "Agent 04", role: "Network" }
            ].map((member, i) => (
              <div key={i} className="flex flex-col group">
                <div className="aspect-[4/5] bg-muted rounded-2xl mb-4 flex items-center justify-center border-2 border-border group-hover:border-foreground transition-colors">
                  <span className="text-muted-foreground font-display text-4xl opacity-50">{member.name.split(' ')[1]}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">{member.name}</h3>
                <p className="text-sm font-bold text-accent uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
