"use client";

import { motion } from "framer-motion";
import React from "react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-16 pb-32 font-sans selection:bg-accent selection:text-background overflow-hidden">
      
      {/* Elegant Hero */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 max-w-5xl text-center pt-0 pb-24 md:pb-32"
      >
        <motion.p 
          variants={fadeUpVariant}
          className="text-accent font-bold uppercase tracking-[0.3em] text-sm mb-6 inline-block"
        >
          Who We Are
        </motion.p>
        <motion.h1 
          variants={fadeUpVariant}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-10"
        >
          We don't just edit videos. <br className="hidden md:block" />
          <span className="text-muted-foreground">We engineer attention.</span>
        </motion.h1>
        <motion.p 
          variants={fadeUpVariant}
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Attention is the new oil. But capturing it isn't about luck anymore. It's about brutal, data-driven iteration.
        </motion.p>
      </motion.section>

      {/* The Stats Grid */}
      <section className="bg-foreground text-background py-24 overflow-hidden">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6 max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-center">
            <motion.div 
              variants={scaleUpVariant}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center justify-center p-12 bg-background/5 rounded-3xl cursor-default shadow-2xl shadow-black/50"
            >
              <h3 className="font-display text-7xl md:text-8xl font-black text-accent mb-4 tracking-tighter">600M+</h3>
              <p className="text-lg md:text-xl font-medium uppercase tracking-[0.2em] opacity-80">Views Generated</p>
            </motion.div>
            <motion.div 
              variants={scaleUpVariant}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center justify-center p-12 bg-background/5 rounded-3xl cursor-default shadow-2xl shadow-black/50"
            >
              <h3 className="font-display text-7xl md:text-8xl font-black text-accent mb-4 tracking-tighter">4,000+</h3>
              <p className="text-lg md:text-xl font-medium uppercase tracking-[0.2em] opacity-80">Active Clippers</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 max-w-4xl text-center py-32"
      >
        <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold mb-10 text-foreground">The Philosophy</motion.h2>
        <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed">
          <motion.p variants={fadeUpVariant}>
            We don't believe in "one hit wonders." We believe in flooding the algorithm with high-retention variations until it has no choice but to push you to the top.
          </motion.p>
          <motion.p variants={fadeUpVariant}>
            Scaling high-retention content isn't done on spreadsheets. We utilize proprietary, data-driven workflows and continuous A/B testing to ensure every second maximizes watch time.
          </motion.p>
        </div>
      </motion.section>

      {/* The Centered Journey (Timeline) */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 max-w-5xl py-24"
      >
        <div className="text-center mb-24">
          <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold text-foreground">Our Journey</motion.h2>
          <motion.div variants={fadeUpVariant} className="w-16 h-1 bg-accent mx-auto mt-8 rounded-full"></motion.div>
        </div>

        <div className="relative">
          {/* Center Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="hidden md:block absolute left-1/2 top-0 w-px bg-border -ml-[0.5px]"
          ></motion.div>

          <div className="space-y-16 md:space-y-32">
            {[
              { year: "2026", event: "How It Started", desc: "We noticed that most creators were struggling to keep their audience engaged. Traditional editing just wasn't working for today's fast-paced algorithms.", align: "left" },
              { year: "2026", event: "Building The Team", desc: "We began sourcing and training the best short-form video editors across India, focusing on talent who truly understand viewer psychology and retention.", align: "right" }
            ].map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
                  viewport={{ once: true }}
                  className="hidden md:block absolute left-1/2 w-4 h-4 bg-accent rounded-full -ml-2 outline outline-8 outline-background z-10"
                ></motion.div>

                <motion.div 
                  variants={fadeUpVariant}
                  className={`w-full md:w-1/2 ${step.align === 'left' ? 'md:pr-24 text-center md:text-right' : 'md:pl-24 text-center md:text-left'} mb-8 md:mb-0`}
                >
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="text-accent font-bold uppercase tracking-[0.2em] text-sm block mb-4 origin-center md:origin-bottom"
                  >
                    {step.year}
                  </motion.span>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">{step.event}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>

                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* The Architects (Team) */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 max-w-6xl py-32"
      >
        <div className="text-center mb-20">
          <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold text-foreground">The Architects</motion.h2>
          <motion.div variants={fadeUpVariant} className="w-16 h-1 bg-accent mx-auto mt-8 rounded-full"></motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { name: "Rahul S.", role: "Head of Strategy" },
            { name: "Aditya V.", role: "Chief Editor" },
            { name: "Rohan P.", role: "VFX & Sound" },
            { name: "Karan M.", role: "Network Dir." }
          ].map((member, i) => (
            <motion.div 
              key={i} 
              variants={fadeUpVariant}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group text-center cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-muted/30 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:shadow-2xl group-hover:shadow-accent/20">
                <span className="font-display text-4xl text-muted-foreground/30 font-bold group-hover:text-background transition-colors duration-500">{member.name.split(' ')[1]}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{member.name}</h3>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
