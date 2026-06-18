"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PortalBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* Background shapes */}
      <motion.div
        animate={{
          y: ["-20%", "20%", "-20%"],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-[4rem] border-8 border-accent/20 bg-accent/5 mix-blend-screen"
      />

      <motion.div
        animate={{
          x: ["20%", "-20%", "20%"],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-32 bottom-10 h-[40rem] w-[40rem] border-8 border-border bg-border/20 mix-blend-screen"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-[200px]"
      />
      
      {/* Animated Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
        }}
      />
    </div>
  );
}
