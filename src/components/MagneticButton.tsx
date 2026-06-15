"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-accent text-accent-foreground font-bold transition-colors hover:bg-accent/90",
        className
      )}
      data-cursor-hover="true"
      {...props}
    >
      {children}
    </motion.button>
  );
}
