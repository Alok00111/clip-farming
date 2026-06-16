"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/posts";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
};

export default function BlogListClient() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-32 pb-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <h1 className="font-display text-5xl font-black uppercase tracking-tight text-foreground sm:text-7xl lg:text-[8rem] leading-none">
            THE ALGORITHM <br />
            <span className="text-accent underline decoration-border underline-offset-[0.5rem] decoration-[0.5rem]">UNLOCKED.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl sm:text-2xl font-medium text-muted-foreground">
            We don't write SEO spam. We publish field reports from the frontlines of viral engineering. Read our strategies. Steal our tactics.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} className="h-full">
              <Link 
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-3xl border-4 border-border bg-muted/30 p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-3 hover:-translate-x-3 hover:bg-background hover:shadow-[16px_16px_0px_0px_var(--foreground)] hover:border-foreground"
                data-cursor-hover="true"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full border-2 border-border bg-accent px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[2px_2px_0px_0px_var(--border)]">
                    {post.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="mb-4 font-display text-3xl font-black uppercase leading-tight text-foreground group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                
                <p className="mb-8 text-lg font-medium text-muted-foreground line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t-4 border-border pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{post.date}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-foreground font-black text-background transition-transform group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
