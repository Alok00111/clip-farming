import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg 
        width="84" 
        height="84" 
        viewBox="-10 -15 130 130" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0", iconClassName)}
      >
        <defs>
          <linearGradient id="shape-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="arrow-grad" x1="80" y1="20" x2="105" y2="-5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
          <filter id="logo-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodOpacity="0.3" floodColor="#000000" />
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

          {/* Orange Arrow */}
          <path 
            d="M 105 -5 L 80 5 L 80 20 L 95 20 Z" 
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
