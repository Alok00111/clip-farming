"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Mic, MonitorPlay, Music, Tv, GraduationCap, UserCircle2, Briefcase, Gamepad2, Landmark } from "lucide-react";

import Link from "next/link";

const creators = [
  { name: "Public Figures", slug: "public-figures", icon: UserCircle2 },
  { name: "Brands/Startups", slug: "brands-startups", icon: Briefcase },
  { name: "Gamers", slug: "gamers", icon: Gamepad2 },
  { name: "Politicians", slug: "politicians", icon: Landmark },
  { name: "Podcasters", slug: "podcasters", icon: Mic },
  { name: "YouTubers", slug: "youtubers", icon: MonitorPlay },
  { name: "Music Artists", slug: "music-artists", icon: Music },
  { name: "Movies & TV", slug: "movies-tv", icon: Tv },
  { name: "Educators", slug: "educators", icon: GraduationCap },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background pt-32 md:pt-40 pb-16">
      {/* Background Animated Shapes */}
      <motion.div
        className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-accent/5 blur-3xl"
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
        
        {/* Main Headline replacing 'Scale Your Personal Brand' */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground/90">
            Built to scale <span className="text-accent">every</span> type of creator
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl">
            {creators.map((creator, i) => {
              const Icon = creator.icon;
              return (
                <Link
                  key={i}
                  href={`/blog?category=${creator.slug}`}
                  className="flex items-center gap-2 sm:gap-3 rounded-full border border-border bg-white shadow-sm px-5 py-2.5 sm:px-6 sm:py-3 transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer hover:border-accent"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  <span className="font-bold text-foreground text-xs sm:text-sm tracking-wide uppercase">{creator.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Data-Driven Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: 0.8 }}
          className="mx-auto mt-12 max-w-2xl text-lg font-medium text-muted-foreground sm:text-xl"
        >
          Our elite network of clippers runs hyper-targeted viral campaigns for Founders, Politicians, and Creators—driving massive organic traffic for as low as{" "}
          <span className="font-bold text-foreground">$0.001 per view.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton className="h-16 px-10 text-lg uppercase tracking-wider">
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
