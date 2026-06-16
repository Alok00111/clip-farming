"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

function Counter({
  value,
  direction = "up",
  format = (v: number) => Math.round(v).toLocaleString(),
}: {
  value: number;
  direction?: "up" | "down";
  format?: (v: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = format(latest);
      }
    });
  }, [springValue, format]);

  return <span ref={ref} />;
}

const stats = [
  { value: 1.8, suffix: "B+", label: "Verified Views", decimals: 1 },
  { prefix: "+", value: 450, suffix: "%", label: "Client Growth", decimals: 0 },
  { prefix: "$", value: 0.001, suffix: "", label: "Lowest CPV", decimals: 3 },
  { value: 7240, suffix: "+", label: "Active Clippers", decimals: 0 },
];

export default function Stats() {
  return (
    <section className="relative w-full border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <h3 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {stat.prefix}
                <Counter
                  value={stat.value}
                  format={(v) => v.toFixed(stat.decimals)}
                />
                {stat.suffix}
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="mt-24 w-full overflow-hidden border-t border-b border-border bg-muted/30 py-10">
        <div className="flex w-[200%] items-center animate-marquee">
          {/* We duplicate the logos array twice to ensure seamless scrolling */}
          {[1, 2].map((group) => (
            <div key={group} className="flex w-1/2 items-center justify-around">
              {["Spotify", "Netflix", "YouTube", "Instagram", "Twitch", "Patreon"].map((logo) => (
                <div key={logo} className="mx-8 font-display text-2xl font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                  {logo}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
