"use client";

import { motion } from "framer-motion";
import { Network, Zap, TrendingUp, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ViralArchitecture() {
  return (
    <section className="relative w-full bg-background py-24 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground"
          >
            The Viral <span className="text-accent">Architecture.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            How we engineer millions of views predictably.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Card 1: The Network Swarm (Large) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2 row-span-2 rounded-3xl border border-border bg-white shadow-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent z-0" />
            
            {/* Abstract Network Graphic */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <div className="relative w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-accent rounded-full blur-[2px]"
                    style={{
                      width: Math.random() * 8 + 4 + "px",
                      height: Math.random() * 8 + 4 + "px",
                      top: Math.random() * 100 + "%",
                      left: Math.random() * 100 + "%",
                    }}
                    animate={{
                      y: [0, Math.random() * -30 - 10, 0],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-10">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-3 w-16 h-16">
                <Network className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-3xl font-bold text-foreground mb-2">The Swarm</h3>
              <p className="text-muted-foreground text-lg max-w-md">
                A highly-coordinated, decentralized network of 3,000+ active human clippers pushing your content across thousands of burner accounts simultaneously.
              </p>
            </div>
          </motion.div>

          {/* Card 2: The Algorithm Hack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 rounded-3xl border border-border bg-white shadow-sm p-8 flex flex-col justify-between group overflow-hidden relative"
          >
             {/* Scrolling Platforms Graphic */}
             <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform rotate-12">
               <div className="flex flex-col gap-4 text-7xl font-display font-black text-foreground">
                 <span className="marquee-fast">TIKTOK SHORTS REELS TIKTOK</span>
                 <span className="marquee-fast-reverse">SHORTS REELS TIKTOK SHORTS</span>
               </div>
             </div>

            <div className="relative z-10">
              <Cpu className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Omnipresence</h3>
              <p className="text-muted-foreground">
                We don't rely on one platform. Your clips are algorithmically optimized for TikTok, YouTube Shorts, and Instagram Reels simultaneously.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Retention Engineering */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 rounded-3xl border border-border bg-white shadow-sm p-8 flex flex-col justify-between"
          >
            <div>
              <Zap className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Retention Hacks</h3>
              <p className="text-muted-foreground">
                AI-assisted curation, hyper-stimulating B-roll, and psychological hooks engineered specifically to keep viewers watching past the 3-second mark.
              </p>
            </div>
          </motion.div>

          {/* Card 4: The Unfair Advantage (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 lg:col-span-3 row-span-1 rounded-3xl border border-border bg-foreground text-background shadow-sm p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            
            <div className="relative z-10 md:w-1/2 mb-6 md:mb-0">
              <TrendingUp className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-display text-3xl font-bold mb-2">The Unfair Advantage</h3>
              <p className="text-muted opacity-90 text-lg">
                Stop paying $15 for Facebook clicks. Our network consistently delivers hyper-targeted, organic views for fractions of a penny.
              </p>
            </div>

            <div className="relative z-10 text-center md:text-right">
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Guaranteed CPV</span>
              <div className="font-display text-6xl md:text-8xl font-black text-white">
                $0.001
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
