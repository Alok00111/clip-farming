"use client";

import { motion } from "framer-motion";
import { Mic, MonitorPlay, Music, Tv, GraduationCap, UserCircle2, Briefcase, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

const creators = [
  { name: "Podcasters", icon: Mic },
  { name: "YouTubers", icon: MonitorPlay },
  { name: "Music Artists", icon: Music },
  { name: "Movies & TV", icon: Tv },
  { name: "Educators", icon: GraduationCap },
  { name: "Public Figures", icon: UserCircle2 },
  { name: "Brands/Startups", icon: Briefcase },
  { name: "Gamers", icon: Gamepad2 },
];

export default function BuiltForCreators() {
  return (
    <section className="relative w-full bg-background pb-16 pt-8 overflow-hidden border-b border-border/40">
      
      {/* Subtle top fade to blend with hero if needed */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background to-transparent z-10" />

      <div className="container mx-auto px-6 flex flex-col items-center text-center mb-8">
        <h2 className="font-display text-sm md:text-base font-bold uppercase tracking-widest text-muted-foreground">
          Built to scale <span className="text-accent">every</span> type of creator
        </h2>
      </div>

      {/* Infinite Scrolling Pills */}
      <div className="relative flex overflow-hidden w-full mask-image-fade py-4">
        <div className="flex w-max animate-scroll" style={{ "--animation-duration": "30s" } as React.CSSProperties}>
          {[1, 2].map((group) => (
            <div key={group} className="flex gap-4 px-2 items-center">
              {creators.map((creator, i) => {
                const Icon = creator.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-full border border-border/50 bg-muted/20 px-6 py-3 transition-colors hover:bg-muted/50 hover:border-border cursor-default whitespace-nowrap"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="font-bold text-foreground text-sm tracking-wide">{creator.name}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
