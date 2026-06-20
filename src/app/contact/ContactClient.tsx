"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { Mail } from "lucide-react";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const budget = formData.get("budget") as string;
    const bottleneck = formData.get("bottleneck") as string;

    const message = `Hi Clip Up Media! I'm interested in scaling my content.\n\n*Creator/Brand:* ${name}\n*Channel:* ${link}\n*Budget:* ${budget}\n*Bottleneck:* ${bottleneck}`;
    
    const whatsappUrl = `https://wa.me/917411486296?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

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
                <a href="mailto:scale@clipupmedia.com" className="group flex items-center justify-between rounded-xl border-2 border-border bg-background p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--accent)]">
                  <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                    <p className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">scale@clipupmedia.com</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground border-2 border-border font-bold">
                    →
                  </div>
                </a>

                <a href="https://wa.me/917411486296?text=Hey%20im%20looking%20to%20scale%20and%20work%20together" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border-2 border-border bg-background p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--accent)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">WhatsApp</p>
                    <p className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">+91 7411486296</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white border-2 border-border font-bold">
                    WA
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
              onSubmit={handleSubmit}
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
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
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
                  className="w-full rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="font-display text-xl font-bold uppercase text-foreground">Monthly Short-Form Budget</label>
                <CustomSelect 
                  name="budget"
                  placeholder="Select an investment tier..."
                  options={[
                    { value: "under-1k", label: "Under $1,000" },
                    { value: "1k-3k", label: "$1,000 - $3,000" },
                    { value: "3k-10k", label: "$3,000 - $10,000" },
                    { value: "10k+", label: "$10,000+" }
                  ]}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bottleneck" className="font-display text-xl font-bold uppercase text-foreground">What's your biggest bottleneck?</label>
                <textarea 
                  id="bottleneck" 
                  name="bottleneck" 
                  rows={4}
                  required
                  placeholder="e.g., I'm spending 20 hours a week editing instead of filming..."
                  className="w-full resize-none rounded-2xl border-4 border-border bg-background p-6 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:bg-accent focus:text-accent-foreground focus:shadow-[6px_6px_0px_0px_var(--border)] focus:-translate-y-1 focus:-translate-x-1"
                ></textarea>
              </div>

              <MagneticButton 
                type="submit"
                className="mt-4 w-full h-auto p-6 font-display text-2xl font-black uppercase tracking-widest text-background transition-all"
              >
                Submit Application
              </MagneticButton>

            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
