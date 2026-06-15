"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap, DollarSign, Award } from "lucide-react";

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
      icon: Award,
      title: "Scale Your Editing",
      description: "Join a private community of elite editors. Get feedback, learn viral hooks, and level up your skills.",
    },
  ];

  return (
    <section className="relative w-full bg-background py-32 overflow-hidden">
      {/* Background Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <div className="h-[40rem] w-[40rem] rounded-full bg-white blur-[150px]" />
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
            <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              Join Our Elite <br />
              <span className="text-neutral-500">Clipper Network.</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              We are always looking for hungry, talented short-form editors. If you know how to find the hook, retain attention, and drive views, we have clients waiting for you.
            </p>

            <form 
              action="https://formspree.io/f/xqeonynr" 
              method="POST"
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="h-14 w-full rounded-full border border-white/10 bg-white/5 px-6 text-white placeholder-neutral-500 outline-none transition-colors focus:border-accent focus:bg-white/10 sm:w-72"
              />
              <button
                type="submit"
                className="flex h-14 items-center justify-center rounded-full bg-white px-8 font-bold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
              >
                Apply Now
              </button>
            </form>
            <p className="mt-4 text-xs text-neutral-500">Limited spots available. Portfolio required upon application.</p>
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
                className={`rounded-3xl border border-white/5 bg-neutral-900/50 p-8 ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
