"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticWrapper from "./MagneticWrapper";
import Logo from "./Logo";

const navLinks = [
  { name: "Process", href: "/#how-it-works" },
  { name: "Apply", href: "/apply" },
  { name: "About", href: "/about" },
  { name: "Compare", href: "/compare" },
  { name: "Who We Help", href: "/blog" },
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
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1 justify-start">
            <MagneticWrapper>
              <Link href="/" className="inline-block" data-cursor-hover="true">
                <Logo />
              </Link>
            </MagneticWrapper>
          </div>

          <nav className="hidden items-center justify-center gap-2 lg:flex">
            {navLinks.map((link) => {
              // Exact match for hash links on home, otherwise startsWith for nested routes
              const isActive = link.href.includes('#') 
                ? pathname === '/' 
                : pathname.startsWith(link.href);

              return (
                <MagneticWrapper key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-bold uppercase tracking-widest transition-colors block px-5 py-2.5 rounded-full z-10",
                      isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    data-cursor-hover="true"
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-accent rounded-full -z-10 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </MagneticWrapper>
              );
            })}
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
            <MagneticWrapper strength={0.1}>
              <Link 
                href="/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-border bg-transparent px-5 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:bg-muted hover:scale-105 block whitespace-nowrap"
              >
                Portal Login
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.2}>
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 block whitespace-nowrap"
                data-cursor-hover="true"
              >
                Book a Call
              </Link>
            </MagneticWrapper>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex justify-end lg:hidden">
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor-hover="true"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
              <Logo />
              <button
                className="text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="mt-20 flex flex-col gap-8">
              {navLinks.map((link, i) => {
                const isActive = link.href.includes('#') 
                  ? pathname === '/' 
                  : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-display text-4xl font-bold uppercase tracking-tight transition-colors",
                      isActive ? "text-accent" : "hover:text-accent/80 text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
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
