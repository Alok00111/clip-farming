"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-background pt-32">
      {/* Massive CTA Section */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-accent p-12 sm:p-20"
        >
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-black sm:text-7xl lg:text-8xl">
            Stop Leaving <br /> Views on the Table.
          </h2>
          <div className="mt-12 flex justify-center">
            <MagneticButton className="h-16 bg-black px-10 text-lg uppercase tracking-wider text-accent hover:bg-neutral-900">
              Book Your Strategy Call
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Actual Footer Links */}
      <div className="container mx-auto mt-20 px-6 pb-12">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 md:flex-row">
          
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black">
              <span className="font-display font-bold">CA</span>
            </div>
            <span className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Clipping Agency
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium uppercase tracking-wider text-neutral-400">
            <button onClick={scrollToTop} className="transition-colors hover:text-white">Home</button>
            <a href="#how-it-works" className="transition-colors hover:text-white">Process</a>
            <a href="#" className="transition-colors hover:text-white">Pricing</a>
            <a href="https://formspree.io/f/xqeonynr" target="_blank" rel="noreferrer" className="flex items-center gap-1 transition-colors hover:text-white">
              For Editors <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <div className="text-sm text-neutral-600">
            &copy; {new Date().getFullYear()} Clipping Agency. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
