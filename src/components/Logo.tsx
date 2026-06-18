import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        width="36" 
        height="36" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0 text-foreground", iconClassName)}
      >
        {/* Rounded Box */}
        <path 
          d="M 50 15 H 30 A 15 15 0 0 0 15 30 V 70 A 15 15 0 0 0 30 85 H 70 A 15 15 0 0 0 85 70 V 50" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Outward Arrow */}
        <path 
          d="M 45 55 L 85 15 M 55 15 H 85 V 45" 
          className="stroke-accent" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </svg>
      <span className={cn("font-display text-xl font-bold uppercase tracking-[0.2em] text-foreground pt-1", textClassName)}>
        Media
      </span>
    </div>
  );
}
