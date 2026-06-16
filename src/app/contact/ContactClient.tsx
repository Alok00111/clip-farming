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

export default function ContactClient() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-32 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h1 className="font-display text-5xl font-black uppercase tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-none">
            INITIATE A VIRAL <br className="hidden sm:block" />
            <span className="text-accent underline decoration-border underline-offset-[0.5rem] decoration-[0.5rem]">CAMPAIGN.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl sm:text-2xl font-medium text-muted-foreground">
            We only work with creators who are ready to scale. If you are looking for cheap edits, close this tab. If you want to dominate the algorithm, fill out the application.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] items-start">
          
          {/* Left Column: Direct Access */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="rounded-3xl border-4 border-border bg-foreground p-10 shadow-[8px_8px_0px_0px_var(--border)]">
              <h2 className="font-display text-3xl font-black uppercase text-background mb-8">Direct Access</h2>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:scale@clipfarming.com" className="group flex items-center justify-between rounded-xl border-2 border-border bg-background p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--accent)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">scale@clipfarming.com</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground border-2 border-border font-bold">
                    →
                  </div>
                </a>

                <a href="#" className="group flex items-center justify-between rounded-xl border-2 border-border bg-background p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--accent)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Community</p>
                    <p className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">Discord Server</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5865F2] text-white border-2 border-border font-bold">
                    DC
                  </div>
                </a>
              </div>

              <div className="mt-12 inline-flex items-center gap-3 rounded-full border-2 border-border bg-accent px-6 py-3 shadow-[4px_4px_0px_0px_var(--border)]">
                <div className="h-3 w-3 rounded-full bg-foreground animate-ping"></div>
                <span className="font-bold uppercase tracking-wider text-accent-foreground">Guaranteed 24HR Response</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Brutalist Form */}
          <motion.div variants={itemVariants}>
            <form 
              action="https://formspree.io/f/YOUR_FORM_ID_HERE" 
              method="POST"
              className="flex flex-col gap-6 rounded-[2.5rem] border-4 border-border bg-muted/30 p-8 sm:p-14 shadow-[12px_12px_0px_0px_var(--border)]"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-display text-xl font-bold uppercase text-foreground">Creator / Brand Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="MrBeast"
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="link" className="font-display text-xl font-bold uppercase text-foreground">Channel Link</label>
                <input 
                  type="url" 
                  id="link" 
                  name="link" 
                  required
                  placeholder="youtube.com/@yourchannel"
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="font-display text-xl font-bold uppercase text-foreground">Monthly Short-Form Budget</label>
                <div className="relative">
                  <select 
                    id="budget" 
                    name="budget" 
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all focus:bg-accent focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                  >
                    <option value="" disabled>Select an investment tier...</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-3k">$1,000 - $3,000</option>
                    <option value="3k-10k">$3,000 - $10,000</option>
                    <option value="10k+">$10,000+</option>
                  </select>
                  <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2">
                    <svg className="h-6 w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bottleneck" className="font-display text-xl font-bold uppercase text-foreground">What's your biggest bottleneck?</label>
                <textarea 
                  id="bottleneck" 
                  name="bottleneck" 
                  rows={4}
                  required
                  placeholder="e.g., I'm spending 20 hours a week editing instead of filming..."
                  className="w-full resize-none rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-4 w-full rounded-2xl border-4 border-foreground bg-foreground p-6 font-display text-2xl font-black uppercase tracking-widest text-background transition-transform hover:scale-[1.02] hover:shadow-[8px_8px_0px_0px_var(--accent)] hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Submit Application
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
