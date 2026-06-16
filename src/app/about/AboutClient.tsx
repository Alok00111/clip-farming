"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const Marquee = () => (
  <motion.div 
    variants={itemVariants}
    className="relative my-32 flex w-full flex-col items-center justify-center overflow-hidden bg-accent py-8 border-y-4 border-border shadow-brutal rotate-1 lg:-mx-6"
  >
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 20, repeat: Infinity }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="mx-8 font-display text-4xl font-black uppercase tracking-widest text-accent-foreground sm:text-6xl">
          RETENTION EDITING • SUBLIMINAL SOUND DESIGN • MILLISECOND PACING • A/B TESTING • VIRAL ENGINEERING • 
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
      className="min-h-screen bg-background pt-32 pb-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-6">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="max-w-6xl">
          <h1 className="font-display text-6xl font-black uppercase tracking-tight text-foreground sm:text-8xl lg:text-[10rem] leading-none">
            WE DON'T EDIT VIDEOS.<br />
            <span className="text-muted-foreground">WE ENGINEER</span><br />
            <span className="text-accent underline decoration-border underline-offset-[1rem] decoration-8">ATTENTION.</span>
          </h1>
        </motion.div>

        {/* Marquee */}
        <Marquee />

        {/* Philosophy Split */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <motion.div variants={itemVariants} className="flex flex-col gap-8 rounded-3xl border-2 border-border bg-foreground p-10 sm:p-14 shadow-[8px_8px_0px_0px_var(--border)]">
            <h2 className="font-display text-4xl font-bold uppercase text-background">The Philosophy</h2>
            <div className="text-xl leading-relaxed text-muted font-medium space-y-6">
              <p>
                Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
              </p>
              <p>
                We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
              </p>
              <p>
                Our network of elite clippers understands the microscopic details that retain human attention. From millisecond pacing adjustments to subliminal sound design, we engineer hooks that literally force people to stop scrolling.
              </p>
            </div>
          </motion.div>

          {/* Metric Blocks */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between gap-8">
            <div className="group rounded-3xl border-2 border-border bg-accent p-10 sm:p-14 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--border)]">
              <h3 className="font-display text-7xl sm:text-8xl font-black uppercase text-accent-foreground group-hover:scale-105 transition-transform origin-left">170k+</h3>
              <p className="mt-4 text-2xl font-bold uppercase tracking-widest text-accent-foreground/80">Active Clippers</p>
            </div>
            
            <div className="group rounded-3xl border-2 border-border bg-muted/50 p-10 sm:p-14 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--foreground)] hover:border-foreground hover:bg-background">
              <h3 className="font-display text-7xl sm:text-8xl font-black uppercase text-foreground group-hover:scale-105 transition-transform origin-left">10B+</h3>
              <p className="mt-4 text-2xl font-bold uppercase tracking-widest text-muted-foreground">Views Generated</p>
            </div>
          </motion.div>
        </div>

        {/* The Rules / Manifesto */}
        <div className="mt-40">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-12">The Manifesto</motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { rule: "01", title: "Data Over Feelings", desc: "If the retention graph drops at 3 seconds, the clip is dead. We don't care how cool the transition looks." },
              { rule: "02", title: "Speed is a Feature", desc: "Trends die in 48 hours. Our 24-hour turnaround isn't a perk, it's a survival requirement." },
              { rule: "03", title: "Flood the Algorithm", desc: "You don't win with one good video. You win by testing 50 micro-variants and scaling the winner." }
            ].map((rule) => (
              <motion.div key={rule.rule} variants={itemVariants} className="flex flex-col gap-4 rounded-3xl border-2 border-border bg-muted/50 p-8 shadow-[6px_6px_0px_0px_var(--border)] hover:shadow-[10px_10px_0px_0px_var(--foreground)] hover:border-foreground hover:-translate-y-2 hover:-translate-x-2 transition-all">
                <span className="font-display text-6xl font-black text-accent">{rule.rule}</span>
                <h3 className="font-display text-2xl font-bold uppercase text-foreground">{rule.title}</h3>
                <p className="text-muted-foreground font-medium text-lg">{rule.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The War Room / Tech Stack */}
        <div className="mt-40">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-12 items-center rounded-[3rem] border-2 border-border bg-foreground p-10 sm:p-16 shadow-[12px_12px_0px_0px_var(--border)] hover:shadow-[16px_16px_0px_0px_var(--accent)] hover:-translate-y-1 hover:-translate-x-1 transition-all">
            <div className="flex-1">
              <h2 className="font-display text-5xl sm:text-6xl font-black uppercase text-background mb-8">The War Room</h2>
              <p className="text-muted text-xl mb-10 leading-relaxed">
                Managing 170,000 clippers isn't done on spreadsheets. We built a proprietary distribution and QA engine that automatically grades retention scores before a video is even published. 
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-accent px-6 py-3 font-bold uppercase tracking-wider text-accent-foreground shadow-[4px_4px_0px_0px_var(--border)] cursor-default">
                Proprietary Tech Stack
              </div>
            </div>
            <div className="flex-1 w-full aspect-[4/3] sm:aspect-video rounded-3xl border-2 border-border bg-background flex items-center justify-center p-6 shadow-inner overflow-hidden relative">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              <div className="font-display text-2xl font-bold text-muted-foreground uppercase tracking-widest text-center border-4 border-dashed border-border p-10 rounded-2xl backdrop-blur-sm bg-background/80">
                Dashboard Interface Preview<br/>
                <span className="text-sm opacity-50 mt-2 block">(Screenshot Placeholder)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-40">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-12">The Timeline</motion.h2>
          <div className="flex flex-col gap-8">
            {[
              { year: "2021", event: "The Origin", desc: "Started scaling single YouTubers manually. Realized traditional editing couldn't keep up with TikTok's volume requirements." },
              { year: "2023", event: "The Network", desc: "Built the automated ingestion pipeline. Scaled the first 10,000 remote clippers and hit 1 Billion total views." },
              { year: "2026", event: "The Machine", desc: "170k active editors. Full proprietary QA engine. Dominating the short-form ecosystem." }
            ].map((step) => (
              <motion.div key={step.year} variants={itemVariants} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center p-8 rounded-3xl border-2 border-border bg-background shadow-[6px_6px_0px_0px_var(--border)] group hover:bg-muted/30 transition-colors">
                <div className="font-display text-5xl sm:text-6xl font-black text-accent bg-foreground px-8 py-4 rounded-2xl shadow-[4px_4px_0px_0px_var(--border)] group-hover:scale-105 group-hover:-rotate-2 transition-transform">{step.year}</div>
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase text-foreground mb-3">{step.event}</h3>
                  <p className="text-xl text-muted-foreground font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Team */}
        <div className="mt-40">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-12">The Architects</motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Agent 01", role: "Head of Strategy" },
              { name: "Agent 02", role: "Chief Pacing Officer" },
              { name: "Agent 03", role: "VFX & Sound Design" },
              { name: "Agent 04", role: "Network Director" }
            ].map((member, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col rounded-3xl border-2 border-border bg-muted/50 p-6 shadow-[6px_6px_0px_0px_var(--border)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_var(--foreground)] hover:border-foreground transition-all">
                <div className="aspect-square w-full rounded-2xl bg-foreground mb-6 flex items-center justify-center shadow-inner overflow-hidden relative border-2 border-border">
                   <div className="w-2/3 h-2/3 bg-accent rounded-full blur-2xl opacity-40 mix-blend-screen animate-pulse"></div>
                   <span className="absolute font-display text-7xl font-black text-background opacity-20">{member.name.split(' ')[1]}</span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-foreground">{member.name}</h3>
                <p className="text-sm font-bold uppercase tracking-wider text-accent mt-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
