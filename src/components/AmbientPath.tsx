"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function AmbientPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // We track the scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Since the horizontal pin happens near the top, we want the vertical line to start drawing
  // AFTER we scroll past the horizontal pin. But to keep it simple, mapping the whole page works fine too,
  // as the line will just fill up as you scroll down.
  // Path draws progressively from 0 to 1 as you scroll down
  const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 hidden w-full xl:block"
    >
      <svg 
        className="h-full w-full"
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        {/* Bright Glowing Track (Dynamically drawn by scroll) */}
        <motion.path
          d="M 1000 0 C 1000 50, 800 100, 800 150 S 950 200, 900 250 S 500 300, 400 350 S 100 450, 200 500 S 700 550, 800 600 S 900 700, 800 750 S 400 800, 500 850 S 800 950, 800 1000"
          fill="transparent"
          stroke="#D4FF00"
          strokeWidth="3"
          style={{ 
            pathLength: pathDraw,
            filter: "drop-shadow(0 0 8px #D4FF00)"
          }}
        />
      </svg>
    </div>
  );
}
