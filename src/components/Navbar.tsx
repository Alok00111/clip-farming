"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import MagneticWrapper from "./MagneticWrapper";

const navLinks = [
  { name: "Process", href: "/#how-it-works" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Apply", href: "/apply" },
  { name: "About", href: "/about" },
  { name: "Compare", href: "/compare" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (pathname.startsWith("/portal")) {
    return null;
  }

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
          "z-50 w-full transition-all duration-300",
          isHome ? "absolute top-0" : "sticky top-0",
          isScrolled && !isHome
            ? "bg-background/80 py-4 backdrop-blur-xl border-b border-border shadow-sm" 
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <MagneticWrapper>
            <Link href="/" className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl inline-block" data-cursor-hover="true">
              CA<span className="text-accent">.</span>
            </Link>
          </MagneticWrapper>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <MagneticWrapper key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground block"
                  data-cursor-hover="true"
                >
                  {link.name}
                </Link>
              </MagneticWrapper>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-4 md:flex">
            <MagneticWrapper strength={0.1}>
              <ThemeToggle />
            </MagneticWrapper>
            <MagneticWrapper strength={0.1}>
              <Link 
                href="/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground block"
              >
                Portal Login
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.2}>
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 block"
                data-cursor-hover="true"
              >
                Book a Call
              </Link>
            </MagneticWrapper>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor-hover="true"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl font-bold uppercase tracking-tight hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-display text-xl font-bold uppercase tracking-tight text-accent-foreground"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
