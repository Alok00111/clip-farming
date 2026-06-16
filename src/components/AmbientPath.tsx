"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function AmbientPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // We track the scroll progress of the grouped wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Top V-splits draw simultaneously from 0 to 0.1
  const topSplitDraw = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  // Main path draws progressively from 0.1 to 0.9 of scroll
  const mainPathDraw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  // The inverted T-splits draw simultaneously from 0.9 to 1.0
  const bottomSplitDraw = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 hidden w-full xl:block"
      style={{ willChange: "transform" }}
    >
      <svg 
        className="h-full w-full"
        viewBox="0 0 1000 3000" 
        preserveAspectRatio="none"
      >
        {/* Faint Background Track - Top Splits */}
        <path
          d="M -10 150 H 250 L 350 250 V 300 L 500 350"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />
        <path
          d="M 1010 150 H 750 L 650 250 V 300 L 500 350"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />

        {/* Faint Background Track - Main */}
        <path
          d="M 500 350 L 800 450 V 900 H 200 L 100 1050 V 1500 L 900 1650 V 2100 H 300 L 150 2250 V 2700 L 500 2850 V 2950"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />
        
        {/* Faint Background Track - Bottom Splits */}
        <path
          d="M 500 2950 H 100"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />
        <path
          d="M 500 2950 H 900"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />

        {/* Bright Glowing Track - Top Splits */}
        <motion.path
          d="M -10 150 H 250 L 350 250 V 300 L 500 350"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: topSplitDraw,
            willChange: "stroke-dashoffset"
          }}
        />
        <motion.path
          d="M 1010 150 H 750 L 650 250 V 300 L 500 350"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: topSplitDraw,
            willChange: "stroke-dashoffset"
          }}
        />

        {/* Bright Glowing Track - Main */}
        <motion.path
          d="M 500 350 L 800 450 V 900 H 200 L 100 1050 V 1500 L 900 1650 V 2100 H 300 L 150 2250 V 2700 L 500 2850 V 2950"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: mainPathDraw,
            willChange: "stroke-dashoffset"
          }}
        />
        
        {/* Bright Glowing Track - Bottom Splits */}
        <motion.path
          d="M 500 2950 H 100"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: bottomSplitDraw,
            willChange: "stroke-dashoffset"
          }}
        />
        <motion.path
          d="M 500 2950 H 900"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: bottomSplitDraw,
            willChange: "stroke-dashoffset"
          }}
        />
      </svg>
    </div>
  );
}
