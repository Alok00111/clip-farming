"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Video, DollarSign, Users } from "lucide-react";

// Reusing CustomSelect for brutalist dropdowns
const CustomSelect = ({ options, placeholder, name }: { options: {value: string, label: string}[], placeholder: string, name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === selected)?.label || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <input type="hidden" name={name} value={selected} required />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full cursor-pointer rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium outline-none transition-all flex justify-between items-center
          ${isOpen ? "bg-accent text-accent-foreground shadow-[6px_6px_0px_0px_var(--border)] -translate-y-1 -translate-x-1" : "text-foreground"}
          ${!selected && !isOpen ? "text-muted-foreground/50" : ""}
        `}
      >
        <span>{selectedLabel}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`h-6 w-6 ${isOpen ? "text-accent-foreground" : "text-foreground"}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
        </motion.svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-4 w-full z-50 rounded-2xl border-4 border-border bg-accent p-2 shadow-[8px_8px_0px_0px_var(--border)]"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer rounded-xl p-4 text-lg font-medium transition-colors
                  ${selected === option.value ? "bg-white text-black" : "text-accent-foreground hover:bg-white hover:text-black"}
                `}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function EditorsClient() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-24 md:pt-32 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-32">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-foreground leading-none">
            STOP CHASING CLIENTS. <br className="hidden sm:block" />
            <span className="text-accent underline decoration-border underline-offset-[0.5rem] decoration-[0.5rem]">START EDITING.</span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-xl sm:text-2xl font-medium text-muted-foreground">
            We handle the sales, the client management, and the strategy. You just open Premiere and do what you do best.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-3 mb-40">
          <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Video className="h-8 w-8" />
            </div>
            <div className="font-display text-3xl font-black uppercase text-foreground">Consistent Workflow</div>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              No more freelance dry spells. We funnel a non-stop stream of high-retention video projects straight to your inbox.
            </p>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <DollarSign className="h-8 w-8" />
            </div>
            <div className="font-display text-3xl font-black uppercase text-foreground">Fast Payouts</div>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              No more chasing invoices or begging clients to pay you. You hit your milestones, you get paid. Period.
            </p>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--foreground)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Users className="h-8 w-8" />
            </div>
            <div className="font-display text-3xl font-black uppercase text-foreground">Elite Network</div>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              Join an exclusive WhatsApp Community of the top 1% of editors. Share project files, learn new techniques, and level up your skills.
            </p>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-black uppercase text-foreground">Join The Roster</h2>
            <p className="mt-4 text-xl font-medium text-muted-foreground">Only the top 1% of applicants are accepted.</p>
          </div>

          <form 
            action="https://formspree.io/f/YOUR_FORM_ID_HERE" 
            method="POST"
            className="flex flex-col gap-6 rounded-[2.5rem] border-4 border-border bg-muted/30 p-8 sm:p-14 shadow-[12px_12px_0px_0px_var(--border)]"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-display text-xl font-bold uppercase text-foreground">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="John Doe"
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="font-display text-xl font-bold uppercase text-foreground">WhatsApp Number</label>
                <input 
                  type="text" 
                  id="whatsapp" 
                  name="whatsapp" 
                  required
                  placeholder="+1 234 567 8900"
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="portfolio" className="font-display text-xl font-bold uppercase text-foreground">Portfolio / Reel Link</label>
              <input 
                type="url" 
                id="portfolio" 
                name="portfolio" 
                required
                placeholder="youtube.com/playlist?list=..."
                className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="software" className="font-display text-xl font-bold uppercase text-foreground">Primary Software</label>
              <CustomSelect 
                name="software"
                placeholder="Select your weapon..."
                options={[
                  { value: "premiere", label: "Adobe Premiere Pro" },
                  { value: "after-effects", label: "Adobe After Effects" },
                  { value: "davinci", label: "DaVinci Resolve" },
                  { value: "final-cut", label: "Final Cut Pro" },
                  { value: "capcut", label: "CapCut Pro" }
                ]}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="capacity" className="font-display text-xl font-bold uppercase text-foreground">Weekly Capacity</label>
              <CustomSelect 
                name="capacity"
                placeholder="How many hours can you edit?"
                options={[
                  { value: "part-time-10", label: "10-20 Hours / Week" },
                  { value: "part-time-20", label: "20-30 Hours / Week" },
                  { value: "full-time", label: "40+ Hours / Week (Full Time)" }
                ]}
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full rounded-2xl border-4 border-foreground bg-foreground p-6 font-display text-2xl font-black uppercase tracking-widest text-background transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--accent)] hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              Submit Application
            </button>
          </form>
        </motion.div>

      </div>
    </motion.div>
  );
}
