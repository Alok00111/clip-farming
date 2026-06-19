import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg 
        width="84" 
        height="84" 
        viewBox="-15 -25 140 145" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0", iconClassName)}
      >
        <defs>
          <linearGradient id="shape-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="arrow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id="logo-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="8" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
          </filter>
        </defs>

        <g filter="url(#logo-shadow)">
          {/* Top Black Shape */}
          <path 
            d="M 30 0 L 80 0 L 0 80 L 0 30 A 30 30 0 0 1 30 0 Z" 
            fill="url(#shape-grad)" 
          />

          {/* Bottom Black Shape */}
          <path 
            d="M 20 100 L 70 100 A 30 30 0 0 0 100 70 L 100 20 L 20 100 Z" 
            fill="url(#shape-grad)" 
          />

          {/* Orange Arrow (Concave arrowhead with tails) */}
          <path 
            d="M 115 -15 L 75 10 L 90 10 L 90 25 Z" 
            fill="url(#arrow-grad)" 
          />
        </g>
      </svg>
      <span className={cn("font-display text-[16px] font-black uppercase tracking-[0.6em] text-foreground pl-[0.6em]", textClassName)}>
        MEDIA
      </span>
    </div>
  );
}
