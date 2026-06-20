"use client";

import { motion, Variants } from "framer-motion";

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
    className="relative my-24 flex w-full flex-col items-center justify-center overflow-hidden bg-foreground py-8 shadow-[0px_8px_0px_0px_var(--border)] border-y-4 border-border -rotate-1 lg:-mx-6"
  >
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 25, repeat: Infinity }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="mx-8 font-display text-4xl font-black uppercase tracking-widest text-background sm:text-6xl">
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
      className="min-h-screen bg-background pt-32 pb-24 overflow-x-hidden"
    >
      <div className="container mx-auto px-6">
        
        {/* Massive Typographic Hero */}
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto text-center mt-12 mb-20">
          <h1 className="font-display text-6xl font-black uppercase tracking-tighter text-foreground sm:text-8xl lg:text-[10rem] leading-[0.85] flex flex-col items-center">
            <span className="hover:scale-105 transition-transform duration-500 cursor-default">WE DON'T</span>
            <span className="text-muted-foreground hover:text-foreground transition-colors duration-500 cursor-default">EDIT VIDEOS.</span>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-accent italic tracking-widest">WE ENGINEER</span>
            </div>
            <span className="underline decoration-border underline-offset-[1rem] decoration-8 hover:decoration-accent transition-colors duration-300 mt-4">ATTENTION.</span>
          </h1>
        </motion.div>

        <Marquee />

        {/* Bento Box Grid (Mission, Stats, War Room) */}
        <div className="mt-32 max-w-7xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-12">The Ecosystem</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* The Philosophy */}
            <motion.div variants={itemVariants} className="md:col-span-2 rounded-[2rem] border-4 border-border bg-foreground p-10 sm:p-14 shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--border)] transition-all flex flex-col justify-between group">
              <h3 className="font-display text-4xl font-black uppercase text-background mb-8 group-hover:text-accent transition-colors">The Philosophy</h3>
              <div className="text-xl sm:text-2xl leading-snug text-muted font-bold space-y-6">
                <p>
                  Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
                </p>
                <p>
                  We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
                </p>
              </div>
            </motion.div>

            {/* Stat 1 */}
            <motion.div variants={itemVariants} className="rounded-[2rem] border-4 border-border bg-accent p-10 shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--border)] transition-all flex flex-col justify-center items-center text-center group">
              <h3 className="font-display text-7xl font-black uppercase text-accent-foreground group-hover:scale-110 transition-transform">4K+</h3>
              <p className="mt-6 text-xl font-bold uppercase tracking-widest text-accent-foreground/80">Active Clippers</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants} className="rounded-[2rem] border-4 border-border bg-muted p-10 shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--foreground)] hover:border-foreground hover:bg-background transition-all flex flex-col justify-center items-center text-center group">
              <h3 className="font-display text-7xl font-black uppercase text-foreground group-hover:scale-110 transition-transform">600M+</h3>
              <p className="mt-6 text-xl font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Views Gen.</p>
            </motion.div>

            {/* The Engine */}
            <motion.div variants={itemVariants} className="md:col-span-2 rounded-[2rem] border-4 border-border bg-background p-10 shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_var(--border)] transition-all flex flex-col sm:flex-row gap-8 items-center overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="flex-1 z-10">
                <h3 className="font-display text-4xl font-black uppercase text-foreground mb-4">The Engine</h3>
                <p className="text-muted-foreground text-xl font-medium leading-relaxed mb-8">
                  Scaling high-retention content isn't done on spreadsheets. We utilize brutal, data-driven workflows and continuous A/B testing to ensure every second of footage maximizes watch time.
                </p>
                <div className="inline-block border-4 border-foreground bg-accent px-6 py-2 font-bold uppercase tracking-widest text-accent-foreground rounded-full shadow-[4px_4px_0px_0px_var(--foreground)]">
                  Data-Driven Workflows
                </div>
              </div>
              <div className="w-full sm:w-1/2 aspect-square sm:aspect-[4/3] rounded-2xl border-4 border-dashed border-border flex items-center justify-center p-6 bg-muted/50 z-10">
                <span className="font-display text-2xl font-black text-muted-foreground uppercase text-center leading-relaxed">Continuous<br/>Iteration<br/>Cycle</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* The Timeline (Vertical Connected) */}
        <div className="mt-40 max-w-5xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-20 text-center">The Timeline</motion.h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-border md:-ml-1 rounded-full"></div>

            <div className="space-y-24">
              {[
                { year: "2026", event: "The Inception", desc: "Recognized the massive gap between traditional editing and the aggressive retention requirements of modern algorithms.", align: "left" },
                { year: "2026", event: "Assembling The Fleet", desc: "Started aggressively vetting and onboarding elite short-form specialists who understand pacing and psychology.", align: "right" },
                { year: "2026", event: "Scaling Up", desc: "Hit our first major view milestones by utilizing rapid iteration and hyper-optimized sound design.", align: "left" },
                { year: "2027", event: "The Future", desc: "Continuing to engineer attention, dominating feeds, and scaling the largest network of retention specialists.", align: "right" }
              ].map((step, i) => (
                <motion.div key={step.event} variants={itemVariants} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-accent border-4 border-background rounded-full -ml-3 md:-ml-4 z-10 shadow-[2px_2px_0px_0px_var(--border)]"></div>

                  {/* Content Box */}
                  <div className={`w-full pl-24 md:pl-0 md:w-1/2 ${step.align === 'left' ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className={`inline-block font-display text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground mb-4`}>
                      {step.year}
                    </div>
                    <div className={`p-8 rounded-3xl border-4 border-border bg-background shadow-[8px_8px_0px_0px_var(--border)] hover:shadow-[12px_12px_0px_0px_var(--foreground)] hover:border-foreground hover:-translate-y-2 transition-all relative group overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-full h-2 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      <h3 className="font-display text-3xl font-black uppercase text-foreground mb-4">{step.event}</h3>
                      <p className="text-xl text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The Architects (Staggered Cards) */}
        <div className="mt-40 max-w-7xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-5xl font-black uppercase text-foreground mb-16 text-center">The Architects</motion.h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Agent 01", role: "Head of Strategy", delay: "mt-0" },
              { name: "Agent 02", role: "Chief Pacing", delay: "mt-0 md:mt-12" },
              { name: "Agent 03", role: "VFX & Sound", delay: "mt-0 md:mt-24" },
              { name: "Agent 04", role: "Network Dir.", delay: "mt-0 md:mt-12" }
            ].map((member, i) => (
              <motion.div key={i} variants={itemVariants} className={`w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] flex flex-col rounded-[2rem] border-4 border-border bg-muted/30 p-6 shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-y-4 hover:shadow-[12px_12px_0px_0px_var(--foreground)] hover:border-foreground hover:bg-background transition-all group ${member.delay}`}>
                <div className="aspect-[4/5] w-full rounded-xl bg-foreground mb-6 flex items-end justify-center shadow-inner overflow-hidden relative border-4 border-border group-hover:border-accent transition-colors">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent rounded-full blur-3xl opacity-30 mix-blend-screen group-hover:animate-pulse"></div>
                   <span className="font-display text-8xl font-black text-background opacity-20 mb-4 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">{member.name.split(' ')[1]}</span>
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-foreground">{member.name}</h3>
                <p className="text-lg font-bold uppercase tracking-widest text-accent mt-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
