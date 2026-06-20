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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
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
