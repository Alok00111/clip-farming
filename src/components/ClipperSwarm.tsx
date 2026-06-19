"use client";

import { motion, useReducedMotion } from "framer-motion";
import { User, Users, Smartphone, MonitorPlay, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Fixed pseudo-random positions for clippers around the center
const clippers = [
  { x: -30, y: -40, delay: 0.1, scale: 0.8 },
  { x: 35, y: -35, delay: 0.2, scale: 0.9 },
  { x: -45, y: 10, delay: 0.3, scale: 1 },
  { x: 45, y: 15, delay: 0.4, scale: 0.85 },
  { x: -25, y: 40, delay: 0.5, scale: 0.95 },
  { x: 25, y: 45, delay: 0.6, scale: 0.75 },
];

export default function ClipperSwarm() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-32 z-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative z-20"
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl">
            The <span className="text-accent">Swarm</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A decentralized network of 3,000+ elite human clippers operating in unison. We flood the algorithm to guarantee your omnipresence.
          </p>
        </motion.div>

        {/* Swarm Visualization Container */}
        <div className="relative mx-auto mt-20 h-[500px] w-full max-w-[800px] flex items-center justify-center">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 800 500">
            {clippers.map((clipper, idx) => {
              // Center is 400, 250
              const cx = 400;
              const cy = 250;
              const tx = 400 + (clipper.x * 6);
              const ty = 250 + (clipper.y * 4);
              return (
                <g key={idx}>
                  <path
                    d={`M ${cx} ${cy} L ${tx} ${ty}`}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="2"
                    fill="none"
                  />
                  {!shouldReduceMotion && (
                    <motion.path
                      d={`M ${cx} ${cy} L ${tx} ${ty}`}
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: [0, 1, 0] }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: clipper.delay,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central Creator Node (Glassmorphic) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute z-20 flex flex-col items-center justify-center"
          >
            <div className="h-28 w-28 rounded-full border border-white/20 bg-background/50 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.2)] flex items-center justify-center relative group">
              <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
              <User className="h-10 w-10 text-foreground" />
              
              {/* Tooltip */}
              <div className="absolute -bottom-10 whitespace-nowrap bg-background/80 backdrop-blur border border-border px-3 py-1 rounded-full text-xs font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                1 Video
              </div>
            </div>
          </motion.div>

          {/* Clipper Nodes */}
          {clippers.map((clipper, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: clipper.scale, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + clipper.delay }}
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `calc(50% + ${clipper.x * 6}px)`,
                top: `calc(50% + ${clipper.y * 4}px)`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <div className="h-16 w-16 rounded-full border border-white/10 bg-muted/30 backdrop-blur-md flex items-center justify-center relative group cursor-pointer hover:bg-accent/10 hover:border-accent/30 transition-colors">
                <Users className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                
                {/* Synchronized Blinking Dot */}
                {!shouldReduceMotion ? (
                  <motion.div 
                    initial={{ opacity: 0.5, scale: 1 }}
                    whileInView={{ 
                      opacity: [0.5, 0.5, 1, 0.5], 
                      scale: [1, 1, 2.2, 1],
                      backgroundColor: ["#f97316", "#f97316", "#ffffff", "#f97316"],
                      boxShadow: [
                        "0 0 10px rgba(249,115,22,0.5)",
                        "0 0 10px rgba(249,115,22,0.5)",
                        "0 0 40px rgba(249,115,22,1)",
                        "0 0 10px rgba(249,115,22,0.5)"
                      ]
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: clipper.delay,
                      times: [0, 0.8, 0.95, 1],
                      ease: "easeOut"
                    }}
                    className="absolute -top-2 -right-2 h-4 w-4 rounded-full" 
                  />
                ) : (
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-accent rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                )}
                
                {/* Tooltip */}
                <div className="absolute -bottom-8 whitespace-nowrap bg-background/80 backdrop-blur border border-border px-3 py-1 rounded-full text-[10px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Clipper #{1000 + idx * 73}
                </div>
              </div>
            </motion.div>
          ))}
          
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center gap-24 sm:gap-40"
        >
          <div className="flex flex-col items-center">
            <h4 className="font-display text-5xl font-black text-foreground">4k+</h4>
            <span className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Active Clippers</span>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-display text-5xl font-black text-accent">600M+</h4>
            <span className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Monthly Views</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
