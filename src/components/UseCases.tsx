"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mic, Video, Music, MonitorPlay, Presentation, UserCircle, Briefcase, Gamepad2 } from "lucide-react";

const useCases = [
  { name: "Podcasters", icon: Mic },
  { name: "YouTubers", icon: Video },
  { name: "Music Artists", icon: Music },
  { name: "Movies & TV", icon: MonitorPlay },
  { name: "Educators", icon: Presentation },
  { name: "Public Figures", icon: UserCircle },
  { name: "Brands/Startups", icon: Briefcase },
  { name: "Gamers", icon: Gamepad2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function UseCases() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl"
        >
          Built for <span className="text-accent">Creators.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400"
        >
          If you have long-form content, our clipper network can scale your reach.
        </motion.p>

        <motion.div
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.name}
              variants={shouldReduceMotion ? {} : itemVariants}
              className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-neutral-900/50 px-6 py-4 transition-all hover:border-accent/50 hover:bg-accent/10"
              data-cursor-hover="true"
            >
              <useCase.icon className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-accent" />
              <span className="font-medium text-white">{useCase.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
