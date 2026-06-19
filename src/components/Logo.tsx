import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0", iconClassName)}
      >
        <defs>
          <mask id="diagonal-cut">
            <rect width="200" height="200" x="-50" y="-50" fill="white" />
            <line x1="5" y1="95" x2="95" y2="5" stroke="black" strokeWidth="18" />
          </mask>
        </defs>

        {/* Solid black square with top-left and bottom-right rounded */}
        <path 
          d="M 30 10 L 90 10 L 90 70 A 20 20 0 0 1 70 90 L 10 90 L 10 30 A 20 20 0 0 1 30 10 Z" 
          className="text-foreground"
          fill="currentColor" 
          mask="url(#diagonal-cut)" 
        />

        {/* Solid orange arrowhead in top right */}
        <path 
          d="M 96 4 L 72 10 L 82 20 L 76 32 Z" 
          className="text-accent"
          fill="currentColor" 
        />
      </svg>
      <span className={cn("font-display text-[11px] font-bold uppercase tracking-[0.4em] text-foreground pl-[0.4em]", textClassName)}>
        MEDIA
      </span>
    </div>
  );
}
