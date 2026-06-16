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

  // Path draws progressively from 0 to 1 as you scroll down
  const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
        {/* Faint Background Track */}
        <path
          d="M 500 0 V 300 L 800 450 V 900 H 200 L 100 1050 V 1500 L 900 1650 V 2100 H 300 L 150 2250 V 2700 L 500 2850 V 3000"
          fill="transparent"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth="4"
        />

        {/* Bright Glowing Track (Optimized) */}
        <motion.path
          d="M 500 0 V 300 L 800 450 V 900 H 200 L 100 1050 V 1500 L 900 1650 V 2100 H 300 L 150 2250 V 2700 L 500 2850 V 3000"
          fill="transparent"
          stroke="currentColor"
          className="text-black dark:text-accent"
          strokeWidth="6"
          style={{ 
            pathLength: pathDraw,
            willChange: "stroke-dashoffset"
          }}
        />
      </svg>
    </div>
  );
}
