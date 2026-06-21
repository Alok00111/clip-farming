"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, TrendingUp, Maximize2, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// 🔴 ADD YOUR VIDEO LINK HERE 🔴
// ==========================================
const featuredVideo = {
  // Replace the src below with your actual video URL (e.g. "https://yoursite.com/video.mp4")
  src: "/videos/blueprint-video.mp4", 
  views: "12.4M", 
  platform: "TikTok & Reels", 
  title: "The Anatomy of a Viral Masterpiece",
  description: "Watch how our signature retention editing, dynamic hooks, and data-driven pacing generate millions of organic views."
};
// ==========================================

export default function VideoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Play video automatically when in view
  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section id="case-studies" className="relative w-full bg-background py-32 overflow-hidden">
      
      {/* Background ambient glow behind the player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl"
          >
            The <span className="text-accent">Blueprint.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Watch exactly how dynamic hooks, relentless pacing, and visual storytelling physically hold a viewer's focus.
          </motion.p>
        </div>

        {/* Massive Screen-filling Player */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[9/16] md:aspect-video lg:aspect-[21/9] max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(249,115,22,0.15)] group pointer-events-none"
        >

          <video
            ref={videoRef}
            src={featuredVideo.src}
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: isHovered ? 1 : 0.85 }}
          />

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-80" />




        </motion.div>

      </div>
    </section>
  );
}
