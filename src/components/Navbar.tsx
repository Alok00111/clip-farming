"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "For Clippers", href: "#for-clippers" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-background/80 py-4 backdrop-blur-md border-b border-white/5" 
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl" data-cursor-hover="true">
            CA<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-accent"
                data-cursor-hover="true"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#book-a-call"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105"
              data-cursor-hover="true"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            data-cursor-hover="true"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-background px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold uppercase tracking-tight">
                CA<span className="text-accent">.</span>
              </span>
              <button
                className="text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="mt-20 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="font-display text-4xl font-bold uppercase tracking-tight hover:text-accent"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                href="#book-a-call"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.5 }}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-display text-xl font-bold uppercase tracking-tight text-accent-foreground"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
