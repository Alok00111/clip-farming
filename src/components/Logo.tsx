import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("overflow-visible shrink-0", iconClassName)}
      >
        <defs>
          <mask id="diagonal-cut">
            <rect width="200" height="200" x="-50" y="-50" fill="white" />
            <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="24" />
          </mask>
        </defs>

        {/* Solid black square with top-left and bottom-right rounded */}
        <path 
          d="M 25 10 L 90 10 L 90 75 A 15 15 0 0 1 75 90 L 10 90 L 10 25 A 15 15 0 0 1 25 10 Z" 
          className="text-foreground"
          fill="currentColor" 
          mask="url(#diagonal-cut)" 
        />

        {/* Solid orange arrowhead in top right */}
        <path 
          d="M 95 5 L 67 21 L 76 24 L 79 33 Z" 
          className="text-accent"
          fill="currentColor" 
        />
      </svg>
      <span className={cn("font-display text-[14px] font-black uppercase tracking-[0.5em] text-foreground pl-[0.5em]", textClassName)}>
        MEDIA
      </span>
    </div>
  );
}
