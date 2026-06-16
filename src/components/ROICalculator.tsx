"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Calculator } from "lucide-react";

export default function ROICalculator() {
  const [budget, setBudget] = useState(1000);
  const shouldReduceMotion = useReducedMotion();

  // Formula: $0.001 per view
  const estimatedViews = Math.floor(budget / 0.001);

  return (
    <section className="relative w-full bg-background py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Calculator className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Calculate Your <span className="text-accent">Growth</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how many guaranteed views your budget can drive through our network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mt-16 rounded-3xl border border-border bg-muted/40 p-8 shadow-brutal backdrop-blur-md sm:p-12"
        >
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
            
            {/* Interactive Slider Area */}
            <div className="flex-1">
              <div className="mb-4 flex items-end justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Monthly Budget</label>
                <span className="font-display text-3xl font-bold text-foreground">${budget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted-foreground/30 accent-accent"
              />
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>$100</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Results Output */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">Estimated Views</span>
              <div className="mt-2 font-display text-5xl font-bold text-foreground sm:text-6xl">
                {estimatedViews >= 1000000 
                  ? `${(estimatedViews / 1000000).toFixed(1)}M+` 
                  : `${(estimatedViews / 1000).toFixed(0)}K+`}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                At $0.001 Average Cost Per View
              </p>
            </div>

          </div>

          <div className="mt-12 flex justify-center">
            <MagneticButton className="h-14 px-8 text-sm uppercase tracking-wider">
              Start Scaling Today
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
