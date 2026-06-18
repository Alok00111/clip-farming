"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowDown, TrendingUp, Users, CheckCircle } from "lucide-react";

import SplitText from "./SplitText";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-accent pt-20">


      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 className="font-display text-5xl font-bold uppercase leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl text-white">
          <SplitText 
            text="Scale Your Personal Brand To Millions." 
            highlightWords={["Millions."]} 
            highlightClass="text-black" 
            className="justify-center"
            delay={0.1} 
          />
        </h1>

        {/* Data-Driven Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg font-medium text-white sm:text-xl"
        >
          Our elite network of clippers runs hyper-targeted viral campaigns for Founders, Politicians, and Creators—driving massive organic traffic for as low as{" "}
          <span className="font-bold text-white">$0.001 per view.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton className="h-16 px-10 text-lg uppercase tracking-wider bg-black text-white hover:bg-black/90 border-none">
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        {/* Mini Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: 1 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-background bg-muted"
                style={{
                  backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')`,
                  backgroundSize: "cover",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-black" />
            <p className="text-sm font-medium text-white">
              Trusted by <span className="font-bold">50+ Top Leaders, Creators & Brands</span>
            </p>
          </div>
        </motion.div>
      </div>


    </section>
  );
}
