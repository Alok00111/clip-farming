"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
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
      // Simulate loading time for the intro animation
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex items-center gap-2"
          >
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl">
              Clipping
            </h1>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-accent sm:text-6xl">
              Agency
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
