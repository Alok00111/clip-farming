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
      className="pointer-events-none absolute inset-0 z-0 hidden w-full xl:block opacity-50"
    >
      <svg 
        className="h-full w-full"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {/* Faint Background Track */}
        <path
          d="M 50 0 V 10 L 80 15 V 30 H 20 L 10 35 V 50 L 90 55 V 70 H 30 L 15 75 V 90 L 50 95 V 100"
          fill="transparent"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />

        {/* Bright Glowing Track (Dynamically drawn by scroll) */}
        <motion.path
          d="M 50 0 V 10 L 80 15 V 30 H 20 L 10 35 V 50 L 90 55 V 70 H 30 L 15 75 V 90 L 50 95 V 100"
          fill="transparent"
          stroke="#D4FF00"
          strokeWidth="1"
          style={{ pathLength: pathDraw, opacity: 0.3 }}
        />
        <motion.path
          d="M 50 0 V 10 L 80 15 V 30 H 20 L 10 35 V 50 L 90 55 V 70 H 30 L 15 75 V 90 L 50 95 V 100"
          fill="transparent"
          stroke="#D4FF00"
          strokeWidth="0.3"
          style={{ pathLength: pathDraw }}
        />
      </svg>
    </div>
  );
}
