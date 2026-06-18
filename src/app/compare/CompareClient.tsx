"use client";

import { motion, Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import ROICalculator from "@/components/ROICalculator";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function CompareClient() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-32 pb-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-32">
          <h1 className="font-display text-6xl font-black uppercase tracking-tight text-foreground sm:text-8xl lg:text-[10rem] leading-none">
            THE INDUSTRY IS <br />
            <span className="text-accent underline decoration-border underline-offset-[1rem] decoration-8">BROKEN.</span>
          </h1>
          <p className="mt-12 text-2xl font-medium text-muted-foreground max-w-3xl mx-auto">
            AI clipping tools give you garbage edits. Traditional agencies take 3 weeks to deliver a single reel. We built the ruthless alternative.
          </p>
        </motion.div>

        {/* Hidden Costs Cards */}
        <motion.div variants={itemVariants} className="mb-40">
          <h2 className="font-display text-5xl font-black uppercase text-foreground mb-12 text-center">The Hidden Costs of "Cheap"</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
              <div className="font-display text-3xl font-black uppercase text-foreground">AI Auto-Clippers</div>
              <div className="text-xl font-bold text-red-500">Cost: $20/mo + 0 retention</div>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                They chop randomly, add generic captions, and miss the human nuance required to actually hook a viewer. You save money, but you get zero views.
              </p>
            </div>
            <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
              <div className="font-display text-3xl font-black uppercase text-foreground">Fiverr Freelancers</div>
              <div className="text-xl font-bold text-red-500">Cost: $15/vid + missed deadlines</div>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                Communication is a nightmare. They don't understand algorithmic strategy. They just follow basic instructions slowly.
              </p>
            </div>
            <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
              <div className="font-display text-3xl font-black uppercase text-foreground">In-House Editors</div>
              <div className="text-xl font-bold text-red-500">Cost: $5k/mo + slow output</div>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                One person can only edit so fast. If you want to post 5x a day across 4 platforms, a single employee physically cannot scale with you.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The Matrix Table */}
        <motion.div variants={itemVariants} className="mb-40">
          <h2 className="font-display text-5xl font-black uppercase text-foreground mb-12 text-center">The Matrix</h2>
          <div className="overflow-x-auto rounded-[2.5rem] border-4 border-border bg-muted/30 shadow-[16px_16px_0px_0px_var(--border)]">
            <table className="w-full min-w-[1000px] text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-border bg-foreground text-background">
                  <th className="p-8 font-display text-2xl font-black uppercase w-1/3">Feature</th>
                  <th className="p-8 font-display text-3xl font-black uppercase text-accent border-l-4 border-border text-center bg-foreground">Clipping Agency</th>
                  <th className="p-8 font-display text-xl font-bold uppercase opacity-60 text-center border-l-4 border-border">AI Tools</th>
                  <th className="p-8 font-display text-xl font-bold uppercase opacity-60 text-center border-l-4 border-border">Traditional Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-border">
                {[
                  { feature: "Human-Engineered Retention", us: true, ai: false, agency: true },
                  { feature: "Turnaround Time", us: "24 Hours", ai: "Instant (Garbage)", agency: "2-3 Weeks" },
                  { feature: "Scale Strategy", us: "300+ Videos / Month", ai: "DIY", agency: "15 Videos / Month" },
                  { feature: "Subliminal Sound Design", us: true, ai: false, agency: false },
                  { feature: "A/B Variant Testing", us: true, ai: false, agency: false },
                  { feature: "Dedicated Slack Channel", us: true, ai: false, agency: true },
                  { feature: "Algorithm Expertise", us: true, ai: false, agency: "Hit or Miss" },
                  { feature: "Performance Guarantee", us: true, ai: false, agency: false },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-accent/10 transition-colors group">
                    <td className="p-8 text-xl font-bold text-foreground border-r-4 border-border">{row.feature}</td>
                    
                    <td className="p-8 border-r-4 border-border text-center bg-accent/5 group-hover:bg-accent/20 transition-colors">
                      {typeof row.us === "boolean" ? (
                        row.us ? <Check className="h-10 w-10 text-accent mx-auto" strokeWidth={4} /> : <X className="h-10 w-10 text-red-500 mx-auto" strokeWidth={4} />
                      ) : (
                        <span className="font-display text-2xl font-black text-accent">{row.us}</span>
                      )}
                    </td>

                    <td className="p-8 border-r-4 border-border text-center bg-background group-hover:bg-background/80 transition-colors">
                      {typeof row.ai === "boolean" ? (
                        row.ai ? <Check className="h-8 w-8 text-foreground/50 mx-auto" strokeWidth={3} /> : <X className="h-8 w-8 text-red-500/50 mx-auto" strokeWidth={3} />
                      ) : (
                        <span className="font-bold text-muted-foreground">{row.ai}</span>
                      )}
                    </td>

                    <td className="p-8 text-center bg-background group-hover:bg-background/80 transition-colors">
                      {typeof row.agency === "boolean" ? (
                        row.agency ? <Check className="h-8 w-8 text-foreground/50 mx-auto" strokeWidth={3} /> : <X className="h-8 w-8 text-red-500/50 mx-auto" strokeWidth={3} />
                      ) : (
                        <span className="font-bold text-muted-foreground">{row.agency}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>



        {/* ROI Calculator */}
        <motion.div variants={itemVariants} className="mt-40 mb-20">
          <ROICalculator />
        </motion.div>

      </div>
    </motion.div>
  );
}
