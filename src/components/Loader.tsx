"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsLoading(false);
      return;
    }

    let current = 0;
    // 50 steps * 20ms = 1000ms (1 second) duration
    const interval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100;
      setPercentage(current);
      
      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Small pause at 100%
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence initial={false}>
      {isLoading && (
        <motion.div
          initial={false}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background border-b-[10px] border-accent"
        >
          <div className="flex flex-col items-center">
            <div className="font-display text-[15vw] leading-none font-black text-foreground tracking-tighter">
              {percentage}%
            </div>
            <div className="text-xl font-bold uppercase tracking-[0.5em] text-muted-foreground mt-4">
              Initializing
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
