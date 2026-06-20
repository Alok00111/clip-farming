"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { Mail } from "lucide-react";


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
      className="min-h-screen bg-background pt-24 md:pt-32 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-foreground leading-none">
            INITIATE A VIRAL <br className="hidden sm:block" />
            <span className="text-accent underline decoration-border underline-offset-[0.5rem] decoration-[0.5rem]">CAMPAIGN.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl sm:text-2xl font-medium text-muted-foreground">
            We only work with creators who are ready to scale. If you are looking for cheap edits, close this tab. If you want to dominate the algorithm, fill out the application.
          </p>
        </motion.div>

        {/* Centered Direct Access */}
        <div className="mx-auto max-w-2xl">
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

                <a href="tel:+917411486296" className="group flex items-center justify-between rounded-xl border-2 border-border bg-background p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--accent)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Call Us Directly</p>
                    <p className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">+91 7411486296</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background border-2 border-border font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                </a>
              </div>

              <div className="mt-12 inline-flex items-center gap-3 rounded-full border-2 border-border bg-accent px-6 py-3 shadow-[4px_4px_0px_0px_var(--border)]">
                <div className="h-3 w-3 rounded-full bg-foreground animate-ping"></div>
                <span className="font-bold uppercase tracking-wider text-accent-foreground">Guaranteed 24HR Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
