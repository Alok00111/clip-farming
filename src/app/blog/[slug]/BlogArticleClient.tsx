"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/data/posts";

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <article className="container mx-auto px-6 max-w-4xl">
        
        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="mb-16 border-b-4 border-border pb-16"
        >
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-muted/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-foreground hover:text-background">
              ← Back to Intel
            </Link>
            <span className="inline-flex items-center rounded-full border-2 border-border bg-accent px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[2px_2px_0px_0px_var(--border)]">
              {post.category}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {post.readTime}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              • {post.date}
            </span>
          </div>

          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-foreground sm:text-7xl">
            {post.title}
          </h1>
        </motion.div>

        {/* Article Content (Prose) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-xl prose-stone dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-p:font-medium prose-p:leading-relaxed prose-a:text-accent prose-a:decoration-4 hover:prose-a:text-foreground prose-strong:text-foreground prose-strong:font-black"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA Block */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="mt-32 rounded-[2rem] border-4 border-border bg-accent p-12 text-center shadow-[12px_12px_0px_0px_var(--border)]"
        >
          <h2 className="font-display text-4xl font-black uppercase text-accent-foreground mb-6">Stop reading. Start scaling.</h2>
          <p className="text-xl font-medium text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            If you found this strategy valuable, imagine what our network of 4000+ editors could do for your actual content.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-4 border-accent-foreground bg-background px-10 py-5 font-display text-2xl font-black uppercase tracking-widest text-foreground shadow-[6px_6px_0px_0px_var(--border)] transition-transform hover:scale-105 hover:bg-foreground hover:text-background">
            Book a Strategy Call
          </Link>
        </motion.div>

      </article>
    </div>
  );
}
