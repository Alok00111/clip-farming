"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MagneticWrapper from "./MagneticWrapper";
import Logo from "./Logo";

import { CrowdCanvas } from "./CrowdCanvas";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  if (pathname.startsWith("/portal")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-background pt-32">
      {/* Crowd Canvas Background */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none opacity-40 mix-blend-multiply">
        <CrowdCanvas src="/images/peeps/all-peeps.svg" rows={15} cols={7} />
      </div>

      {/* Massive CTA Section */}
      {pathname === "/" && (
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[3rem] border-4 border-border bg-accent p-12 sm:p-20 shadow-[16px_16px_0px_0px_var(--border)]"
          >
            <h2 className="font-display text-5xl font-black uppercase tracking-tight text-accent-foreground sm:text-7xl lg:text-8xl">
              Stop Leaving <br /> Views on the Table.
            </h2>
            <div className="mt-12 flex justify-center">
              <MagneticWrapper strength={0.1}>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-4 border-accent-foreground bg-accent-foreground px-10 h-16 font-display text-xl font-black uppercase tracking-widest text-accent transition-transform hover:scale-105 hover:shadow-[6px_6px_0px_0px_var(--border)]" data-cursor-hover="true">
                  Book Your Strategy Call
                </Link>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      )}

      {/* Actual Footer Links */}
      <div className="container relative z-10 mx-auto mt-20 px-6 pb-12">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row">
          
          <MagneticWrapper strength={0.1}>
            <Logo />
          </MagneticWrapper>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <MagneticWrapper strength={0.2}><Link href="/" className="transition-colors hover:text-foreground inline-block">Home</Link></MagneticWrapper>
            <MagneticWrapper strength={0.2}><Link href="/about" className="transition-colors hover:text-foreground inline-block">About</Link></MagneticWrapper>
            <MagneticWrapper strength={0.2}><Link href="/case-studies" className="transition-colors hover:text-foreground inline-block">Case Studies</Link></MagneticWrapper>
            <MagneticWrapper strength={0.2}><Link href="/compare" className="transition-colors hover:text-foreground inline-block">Compare</Link></MagneticWrapper>
            <MagneticWrapper strength={0.2}><Link href="/blog" className="transition-colors hover:text-foreground inline-block">Blog</Link></MagneticWrapper>
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Clipping Agency. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
