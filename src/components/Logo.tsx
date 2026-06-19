"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iterations) return text[index];
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          }).join("")
        );

        if (iterations >= text.length) {
          clearInterval(glitchInterval);
          setDisplayText(text);
        }
        iterations += 1 / 2;
      }, 30);
    }, 4000 + Math.random() * 2000); // Randomize glitch interval between 4-6s

    return () => clearInterval(interval);
  }, [text]);

  return <span className="inline-block min-w-[3ch]">{displayText}</span>;
}

export default function Logo({ className, iconClassName, textClassName }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      
      {/* New Text Layout on the Left */}
      <div className={cn("flex items-center", textClassName)}>
        <span className="text-accent text-[3rem] font-bold italic leading-none mr-2.5 -mt-0.5">/</span>
        <div className="flex flex-col font-display font-black text-2xl leading-[0.85] tracking-tight text-foreground">
          <ScrambleText text="CLIP" />
          <ScrambleText text="UP" />
        </div>
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/70 ml-2 mt-1">
          MEDIA
        </span>
      </div>

      <svg 
        width="64" 
        height="64" 
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
      
    </div>
  );
}
