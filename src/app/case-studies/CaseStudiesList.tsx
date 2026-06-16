"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Campaign } from "@/data/campaigns";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 }
  }
};

export default function CaseStudiesList({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
    >
      {campaigns.map((study) => (
        <motion.div key={study.slug} variants={itemVariants}>
          <Link 
            href={`/case-studies/${study.slug}`}
            className="group flex flex-col h-full rounded-3xl border-2 border-border bg-muted/50 p-10 shadow-[4px_4px_0px_0px_var(--border)] transition-all duration-300 hover:-translate-y-3 hover:-translate-x-3 hover:bg-background hover:shadow-[16px_16px_0px_0px_var(--foreground)] hover:border-foreground"
            data-cursor-hover="true"
          >
            <div className="mb-4 flex items-start justify-between w-full">
              <span className="inline-flex items-center rounded-full border-2 border-border bg-foreground px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-background transition-transform group-hover:scale-110 group-hover:-rotate-2">
                {study.client}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-accent">
                Read Case Study →
              </span>
            </div>
            
            <h2 className="mt-4 font-display text-5xl font-black uppercase text-foreground group-hover:text-accent transition-colors">
              {study.stats}
            </h2>
            <span className="mt-2 font-display text-xl font-bold text-foreground">
              {study.metric}
            </span>
            <p className="mt-6 text-lg text-muted-foreground">
              {study.shortDescription}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
