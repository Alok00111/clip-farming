"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-neutral-950 antialiased px-6">
      <BackgroundBeams />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-neutral-400 max-w-lg mx-auto text-lg">
          We are currently building the ultimate portal for our network of clippers.
        </p>
      </motion.div>
    </div>
  );
}
