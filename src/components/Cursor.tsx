"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover='true']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isTouchDevice && !shouldReduceMotion) {
      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (!isTouchDevice && !shouldReduceMotion) {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [isTouchDevice, shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex h-4 w-4 items-center justify-center rounded-full shadow-lg",
        isHovering ? "bg-foreground" : "bg-foreground"
      )}
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        scale: isHovering ? 3 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
        mass: 0.5,
      }}
    >
      {isHovering && (
        <span className="text-[6px] font-bold text-background opacity-100">
          GO
        </span>
      )}
    </motion.div>
  );
}
