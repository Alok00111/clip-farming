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
        className={cn("overflow-visible shrink-0", iconClassName)}
      >
        <defs>
          <mask id="diagonal-cut">
            <rect width="200" height="200" x="-50" y="-50" fill="white" />
            <line x1="-20" y1="120" x2="120" y2="-20" stroke="black" strokeWidth="16" />
          </mask>
        </defs>

        {/* Solid square with top-left and bottom-right rounded */}
        <path 
          d="M 36 20 L 80 20 L 80 64 A 16 16 0 0 1 64 80 L 20 80 L 20 36 A 16 16 0 0 1 36 20 Z" 
          className="text-accent"
          fill="currentColor" 
          mask="url(#diagonal-cut)" 
        />

        {/* Solid arrowhead */}
        <path 
          d="M 95 5 L 75 5 L 82 18 L 95 25 Z" 
          className="text-foreground"
          fill="currentColor" 
        />
      </svg>
      <span className={cn("font-display text-2xl font-black uppercase tracking-[0.25em] text-foreground pt-1", textClassName)}>
        MEDIA
      </span>
    </div>
  );
}
