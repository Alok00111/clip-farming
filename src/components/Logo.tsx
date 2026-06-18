import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        width="42" 
        height="42" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0 text-foreground", iconClassName)}
      >
        <defs>
          <mask id="diagonal-cut">
            <rect width="100" height="100" fill="white" />
            <line x1="-10" y1="100" x2="100" y2="-10" stroke="black" strokeWidth="16" />
          </mask>
        </defs>

        {/* Solid rounded square with diagonal cut */}
        <rect 
          x="10" 
          y="10" 
          width="70" 
          height="70" 
          rx="18" 
          fill="currentColor" 
          mask="url(#diagonal-cut)" 
        />

        {/* Solid orange arrowhead shooting out */}
        <path 
          d="M 85 5 L 65 5 L 75 15 L 85 25 Z" 
          className="fill-accent text-accent" 
        />
      </svg>
      <span className={cn("font-display text-2xl font-black uppercase tracking-[0.25em] text-foreground pt-1", textClassName)}>
        MEDIA
      </span>
    </div>
  );
}
