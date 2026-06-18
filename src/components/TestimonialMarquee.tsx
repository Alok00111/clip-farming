"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "ClipFarming took my podcast from 10k to 5M monthly views across TikTok and Shorts. Absolute game changer.",
    name: "Alex H.",
    title: "Top 100 Business Podcast",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote: "We spent thousands on ads. This network delivered 10x the organic reach for a fraction of the cost.",
    name: "Sarah Jenkins",
    title: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote: "The virality is insane. Every single video they clipped for me hit over 500k views within 48 hours.",
    name: "Marcus T.",
    title: "Fitness Influencer",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    quote: "I didn't have time to edit. I just handed them my 3-hour streams and they turned me into a multi-platform star.",
    name: "Elena R.",
    title: "Twitch Streamer",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    quote: "Unbelievable ROI. Our brand awareness skyrocketed and our CAC dropped by 80%.",
    name: "David Chen",
    title: "CMO @ TechBrand",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

export default function TestimonialMarquee({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden mask-image-fade",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {testimonials.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-border bg-background shadow-sm px-8 py-6 md:w-[450px]"
            key={item.name + idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] text-foreground font-medium">
                "{item.quote}"
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <span className="flex flex-col gap-1 ml-4">
                  <span className="text-sm font-bold leading-[1.6] text-foreground">
                    {item.name}
                  </span>
                  <span className="text-xs leading-[1.6] text-muted-foreground uppercase tracking-widest">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
