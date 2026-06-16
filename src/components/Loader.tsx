"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited || shouldReduceMotion) {
      setIsLoading(false);
      if (shouldReduceMotion && !hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
      }
    } else {
      let animationFrameId: number;
      const startTime = performance.now();
      const duration = 1500;
      
      // Custom easing function (easeOutQuart)
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        setPercentage(Math.floor(easedProgress * 100));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasVisited", "true");
          }, 400); // Pause at 100%
        }
      };

      animationFrameId = requestAnimationFrame(updateCounter);
      
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background border-b-[10px] border-accent"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="font-display text-[15vw] leading-none font-black text-foreground tracking-tighter">
              {percentage}%
            </div>
            <div className="text-xl font-bold uppercase tracking-[0.5em] text-muted-foreground mt-4">
              Initializing
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
