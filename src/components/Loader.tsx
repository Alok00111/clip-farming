"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, animate, useMotionValue, useTransform } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest) + "%");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if the user has already visited in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited || shouldReduceMotion) {
      setIsLoading(false);
      if (shouldReduceMotion && !hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
      }
    } else {
      // Counter Animation using MotionValues (Bypasses React State for 60fps)
      const controls = animate(count, 100, {
        duration: 1.5,
        ease: [0.83, 0, 0.17, 1], // Custom easing for cinematic feel
        onComplete: () => {
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasVisited", "true");
          }, 400); // Wait 400ms at 100% before sliding up
        }
      });
      
      return () => controls.stop();
    }
  }, [shouldReduceMotion, count]);

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
            <motion.div className="font-display text-[15vw] leading-none font-black text-foreground tracking-tighter">
              {rounded}
            </motion.div>
            <div className="text-xl font-bold uppercase tracking-[0.5em] text-muted-foreground mt-4">
              Initializing
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
