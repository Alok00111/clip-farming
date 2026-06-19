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
  src: "/videos/clip1.mp4", 
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
            Proof is in the <span className="text-accent">Pixels.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the caliber of editing that commands attention. Our flagship style engineered for maximum retention.
          </motion.p>
        </div>

        {/* Massive Screen-filling Player */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[9/16] md:aspect-video lg:aspect-[21/9] max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(249,115,22,0.15)] group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setIsMuted(!isMuted);
            }
          }}
        >
          {/* Fallback pattern while video is missing */}
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-30 bg-neutral-900">
            <div className="flex flex-col items-center gap-4 text-accent">
              <Play className="h-16 w-16 opacity-50" />
              <span className="text-sm uppercase tracking-widest text-foreground font-bold">Showcase Reel Missing (.mp4)</span>
            </div>
          </div>

          <video
            ref={videoRef}
            src={featuredVideo.src}
            muted={isMuted}
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: isHovered ? 1 : 0.85 }}
          />

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-80" />
          
          {/* Hover Play/Pause UI */}
          <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="bg-background/20 backdrop-blur-md border border-white/10 rounded-full p-6 text-white transform scale-90 group-hover:scale-100 transition-all duration-500">
               {isMuted ? <VolumeX className="h-10 w-10" /> : <Volume2 className="h-10 w-10" />}
             </div>
          </div>

          {/* Featured Info */}
          <div className="absolute bottom-0 left-0 w-full z-40 p-8 md:p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full">
                Featured
              </span>
              <div className="flex items-center gap-2 text-accent bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-bold text-white">{featuredVideo.views} Views</span>
              </div>
            </div>
            
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl">
              {featuredVideo.title}
            </h3>
            
            <p className="text-gray-300 md:text-lg max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">
              {featuredVideo.description}
            </p>
          </div>

          {/* Top right floating info */}
          <div className="absolute top-8 right-8 z-40 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div 
               className="bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full text-white cursor-pointer hover:bg-accent transition-colors"
               onClick={(e) => {
                 e.stopPropagation(); // Prevent triggering the mute toggle
                 if (videoRef.current) {
                   if (videoRef.current.requestFullscreen) {
                     videoRef.current.requestFullscreen();
                   } else if ((videoRef.current as any).webkitRequestFullscreen) {
                     /* Safari */
                     (videoRef.current as any).webkitRequestFullscreen();
                   } else if ((videoRef.current as any).msRequestFullscreen) {
                     /* IE11 */
                     (videoRef.current as any).msRequestFullscreen();
                   }
                 }
               }}
               title="Fullscreen"
             >
               <Maximize2 className="h-5 w-5" />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
