"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the performance-based pricing work?",
    answer: "You only pay for the verified views we generate. Our rate is $0.001 per view. If a video gets 100,000 views, it costs $100. If it flops, you don't pay. It's completely risk-free scaling.",
  },
  {
    question: "Do I need to provide the edited clips?",
    answer: "No. You just provide the raw, long-form content (podcast episodes, interviews, VODs). Our network of editors will find the hooks, edit the clips, add captions, and distribute them.",
  },
  {
    question: "Which platforms do you distribute on?",
    answer: "We primarily focus on TikTok, Instagram Reels, and YouTube Shorts. Our clippers run multiple themed accounts to A/B test hooks and maximize the algorithm's reach.",
  },
  {
    question: "How do you track the views?",
    answer: "We use a proprietary dashboard that connects to our clippers' accounts via API. You get full transparency into which clips are posted, where they are posted, and how many organic views they are driving in real-time.",
  },
  {
    question: "Can I review the clips before they go live?",
    answer: "Due to the massive volume (often 30-50 clips per day), pre-approval isn't feasible. However, we have strict brand safety guidelines, and our QA team reviews clips to ensure they align with your brand's voice and image.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-background py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
        </motion.div>

        <div className="mt-16 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-border bg-muted/50 transition-colors hover:border-foreground/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {faq.question}
                  </span>
                  <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-accent text-accent-foreground' : 'bg-foreground/10 text-foreground'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
