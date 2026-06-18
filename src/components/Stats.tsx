"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import TestimonialMarquee from "./TestimonialMarquee";

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
  { value: 1.2, suffix: "B+", label: "Verified Views", decimals: 1 },
  { prefix: "+", value: 450, suffix: "%", label: "Client Growth", decimals: 0 },
  { prefix: "$", value: 0.001, suffix: "", label: "Lowest CPV", decimals: 3 },
  { value: 3000, suffix: "+", label: "Active Clippers", decimals: 0 },
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

      {/* Client Testimonials Carousel */}
      <div className="mt-24 w-full overflow-hidden pt-10 flex flex-col items-center">
        <h3 className="text-center font-display text-3xl font-bold uppercase tracking-tight text-foreground mb-12">
          Don't just take our word for it
        </h3>
        <TestimonialMarquee direction="left" speed="normal" />
      </div>
    </section>
  );
}
