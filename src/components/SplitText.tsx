"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function SplitText({ text, className, delay = 0, highlightWords = [], highlightClass = "" }: SplitTextProps) {
  // Split the text into words so we can keep words together
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("gap-[0.25em]", className)}
    >
      {words.map((word, index) => {
        const isHighlight = highlightWords.includes(word);
        return (
          <span key={index} className={isHighlight ? highlightClass : undefined} style={{ overflow: "hidden", display: "inline-flex" }}>
            {word.split("").map((character, idx) => (
              <motion.span
                key={idx}
                variants={child}
                style={{ display: "inline-block" }}
              >
                {character}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.div>
  );
}
