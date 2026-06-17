"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap, DollarSign, Award, FastForward } from "lucide-react";
import Link from "next/link";

export default function ForClippers() {
  const shouldReduceMotion = useReducedMotion();

  const benefits = [
    {
      icon: DollarSign,
      title: "Get Paid per View",
      description: "No flat rates. You earn based on performance. The more viral your edits go, the more you make.",
    },
    {
      icon: Zap,
      title: "High-Tier Clients",
      description: "Get access to raw footage from top podcasters, YouTubers, and brands that already have massive reach.",
    },
    {
      icon: FastForward,
      title: "Payouts Twice a Week",
      description: "We completely eliminate the standard 30-day wait. Get paid lightning-fast twice a week to keep your cash flowing.",
    },
    {
      icon: Award,
      title: "Scale Your Editing",
      description: "Join a private community of elite editors. Get feedback, learn viral hooks, and level up your skills.",
    },
  ];

  return (
    <section className="relative w-full bg-background py-32 overflow-hidden">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <div className="h-[40rem] w-[40rem] rounded-full bg-foreground blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:flex lg:items-center lg:gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-accent">For Editors</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl">
              Join Our Elite <br />
              <span className="text-muted-foreground">Clipper Network.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We are always looking for hungry, talented short-form editors. If you know how to find the hook, retain attention, and drive views, we have clients waiting for you.
            </p>

            <div className="mt-10">
              <Link
                href="/apply"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
              >
                Apply Now
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Limited spots available. Portfolio required upon application.</p>
          </motion.div>
        </div>

        {/* Right Content - Benefits Grid */}
        <div className="mt-16 lg:mt-0 lg:w-1/2">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
                className="rounded-3xl border border-border bg-muted/50 p-8 shadow-brutal"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10">
                  <benefit.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
