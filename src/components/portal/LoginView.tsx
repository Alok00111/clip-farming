"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import PortalBackground from "./PortalBackground";

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 pt-20">
      <PortalBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-[2.5rem] border-4 border-border bg-card p-10 shadow-[16px_16px_0px_0px_var(--border)]"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6">
            <Logo iconClassName="text-accent h-16 w-16" textClassName="hidden" />
          </div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-foreground">
            Clipper Portal
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Sign in to claim videos and track payouts.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-border pt-8">
          <div className="inline-flex rounded-full border-2 border-accent bg-accent/10 px-6 py-2 shadow-[4px_4px_0px_0px_var(--accent)]">
            <span className="text-sm font-black uppercase tracking-widest text-accent">
              Coming Soon
            </span>
          </div>
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            We are currently building the ultimate portal for our network of clippers. 
            Check back later to access your personalized dashboard, claim videos, and track your payouts.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
