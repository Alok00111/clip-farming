"use client";

import { motion, Variants } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Briefcase, Gamepad2, Landmark, Mic, MonitorPlay, Music, Tv, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/MagneticButton";

const categories = [
  { 
    name: "Brands/Startups", 
    slug: "brands-startups", 
    icon: Briefcase,
    copy: "Customer acquisition shouldn't be a gamble. We take your core messaging, product demos, and corporate assets, and engineer them into highly engaging viral clips. We bypass traditional marketing fatigue, lower your CAC, and turn organic attention into a relentless driver for new signups and brand authority."
  },
  { 
    name: "Gamers", 
    slug: "gamers", 
    icon: Gamepad2,
    copy: "You just game; we handle the algorithm. We capture the chaos, the high-skill moments, and the hilarious reactions from your streams, transforming them into punchy, high-retention gold for TikTok and Shorts. We turn your active viewers into a massive top-of-funnel audience."
  },
  { 
    name: "Politicians", 
    slug: "politicians", 
    icon: Landmark,
    copy: "Modern campaigns are won on screens, not just streets. We distill complex policy discussions, town halls, and debates into compelling short-form content. Connect instantly with younger demographics and dominate the digital narrative with hyper-targeted organic reach."
  },
  { 
    name: "Podcasters", 
    slug: "podcasters", 
    icon: Mic,
    copy: "Your 2-hour conversations are goldmines hiding in plain sight. We meticulously scrub your episodes for the perfect hooks, controversial takes, and deepest insights, turning them into viral assets that dominate the short-form ecosystem and funnel listeners straight to your full episodes."
  },
  { 
    name: "YouTubers", 
    slug: "youtubers", 
    icon: MonitorPlay,
    copy: "Don't let your long-form masterpieces die after the first week. Our retention-obsessed editors slice your existing catalog into highly addictive Shorts. It's like having a dedicated 24/7 team working in the background to skyrocket your subscriber count and channel momentum."
  },
  { 
    name: "Music Artists", 
    slug: "music-artists", 
    icon: Music,
    copy: "Stop relying on luck for your next release. We take your unreleased tracks, behind-the-scenes studio sessions, and live performances, and spark massive organic trends. We build authentic hype that translates directly into unprecedented streaming numbers."
  },
  { 
    name: "Movies & TV", 
    slug: "movies-tv", 
    icon: Tv,
    copy: "Bypass the traditional trailer format. We extract the most gripping angles, cliffhangers, and emotional hooks from your footage, crafting retention-optimized clips that keep audiences addicted from the very first second. We build massive anticipation long before premiere night."
  },
  { 
    name: "Educators", 
    slug: "educators", 
    icon: GraduationCap,
    copy: "We make learning highly addictive. By translating deep, complex concepts into bite-sized, visually captivating viral clips, we prove that educational content can dominate the algorithm. Watch your course enrollments and student traffic surge as we package your knowledge for maximum attention."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function BlogListClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const defaultCategory = categories[0].slug;
  const urlCategory = searchParams.get("category");
  
  // If the url category isn't in our current list (e.g., they click an old public-figures link), default to the first
  const isValidCategory = categories.some(c => c.slug === urlCategory);
  const initialCategory = isValidCategory && urlCategory ? urlCategory : defaultCategory;
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Sync state if URL changes
  useEffect(() => {
    if (urlCategory && categories.some(c => c.slug === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const handleTabClick = (slug: string) => {
    setActiveCategory(slug);
    router.push(`/blog?category=${slug}`, { scroll: false });
  };

  const activeCategoryData = categories.find(c => c.slug === activeCategory) || categories[0];
  const ActiveIcon = activeCategoryData.icon;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background pt-32 pb-20 overflow-x-hidden"
    >
      <div className="container mx-auto px-6 max-w-[90rem]">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-none">
            PROVEN <span className="text-accent">RESULTS.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl font-medium text-muted-foreground">
            See exactly how we scale every type of creator in the ecosystem.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/4 shrink-0">
            <div className="sticky top-32 flex flex-col gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.slug;
                
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleTabClick(cat.slug)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 text-left rounded-2xl border-2 transition-all duration-300",
                      isActive 
                        ? "bg-foreground text-background border-foreground shadow-[6px_6px_0px_0px_var(--accent)]" 
                        : "bg-background text-foreground border-border hover:border-accent hover:shadow-[4px_4px_0px_0px_var(--accent)]"
                    )}
                  >
                    <Icon className={cn("h-6 w-6", isActive ? "text-accent" : "text-muted-foreground")} />
                    <span className="font-bold uppercase tracking-wider text-sm">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            <motion.div 
              key={activeCategoryData.slug} 
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col rounded-3xl border-4 border-border bg-muted/30 p-10 sm:p-16 shadow-[8px_8px_0px_0px_var(--border)]"
            >
              <div className="flex items-center gap-6 mb-8 border-b-2 border-border/50 pb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]">
                  <ActiveIcon className="h-8 w-8" />
                </div>
                <h2 className="font-display text-4xl font-black uppercase text-foreground">
                  {activeCategoryData.name}
                </h2>
              </div>
              
              <p className="text-2xl font-medium leading-relaxed text-foreground mb-12">
                {activeCategoryData.copy}
              </p>
              
              <div className="flex justify-start">
                <MagneticButton 
                  onClick={() => router.push('/contact')}
                  className="h-16 px-10 text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[6px_6px_0px_0px_var(--border)]"
                >
                  Book a Strategy Call
                </MagneticButton>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
