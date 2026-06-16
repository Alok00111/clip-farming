"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const placeholderVideos = [
  { id: 1, src: "/videos/clip1.mp4", views: "1.2M", platform: "TikTok" },
  { id: 2, src: "/videos/clip2.mp4", views: "850K", platform: "Reels" },
  { id: 3, src: "/videos/clip3.mp4", views: "3.4M", platform: "Shorts" },
  { id: 4, src: "/videos/clip4.mp4", views: "500K", platform: "TikTok" },
  { id: 5, src: "/videos/clip5.mp4", views: "2.1M", platform: "Reels" },
  { id: 6, src: "/videos/clip6.mp4", views: "1.1M", platform: "Shorts" },
];

function VideoCard({ video, index }: { video: typeof placeholderVideos[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 }); // Trigger when 50% visible
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle play/pause logic
  useEffect(() => {
    if (!videoRef.current) return;

    if (isTouchDevice) {
      // Mobile: play when in view
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    } else {
      // Desktop: play on hover
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        // Optional: reset video to start when hover ends
        // videoRef.current.currentTime = 0;
      }
    }
  }, [isInView, isHovered, isTouchDevice]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--accent)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover="true"
    >
      {/* Fallback pattern while video is missing */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-20">
        <div className="flex items-center gap-1 text-accent">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs uppercase tracking-widest text-foreground">Missing .mp4</span>
        </div>
      </div>

      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-300"
        style={{ opacity: isHovered || (isTouchDevice && isInView) ? 1 : 0.7 }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 z-30 flex w-full flex-col p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-bold text-foreground line-clamp-2">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="text-accent">{video.views} Views</span>
          <span>•</span>
          <span className="uppercase tracking-wider">{video.platform}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoGrid() {
  return (
    <section id="case-studies" className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
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
            className="mt-4 text-lg text-muted-foreground"
          >
            Hover to preview some of our highest-performing clips.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {placeholderVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
