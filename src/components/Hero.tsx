"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowDown, TrendingUp, Users, CheckCircle } from "lucide-react";

const headlineWords = "Scale Your Personal Brand To Millions.".split(" ");

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Animated Shapes (No Gradients, Solid Colors with Low Opacity) */}
      <motion.div
        className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-foreground/5 blur-3xl"
        animate={shouldReduceMotion ? {} : {
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        animate={shouldReduceMotion ? {} : {
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 className="font-display text-5xl font-bold uppercase leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : i * 0.1 + 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-[0.2em]"
            >
              {word.includes("Millions") ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Data-Driven Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg font-medium text-muted-foreground sm:text-xl"
        >
          Our elite network of clippers runs hyper-targeted viral campaigns for Founders, Politicians, and Creators—driving massive organic traffic for as low as{" "}
          <span className="font-bold text-foreground">$0.001 per view.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton className="h-16 px-10 text-lg uppercase tracking-wider">
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        {/* Mini Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1.4, duration: 1 }}
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
            <CheckCircle className="h-5 w-5 text-accent" />
            <p className="text-sm font-medium text-foreground">
              Trusted by <span className="font-bold">50+ Top Leaders, Creators & Brands</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
