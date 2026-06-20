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
    copy: "You don't need another expensive ad campaign. You need content people actually want to watch. We take your product demos, founder stories, and everyday business tasks, and turn them into short clips that grab attention naturally. By skipping the traditional ad formats that people immediately scroll past, we help lower your marketing costs and build real trust with your audience. The goal isn't just chasing views—it's turning casual watchers into actual customers."
  },
  { 
    name: "Gamers", 
    slug: "gamers", 
    icon: Gamepad2,
    copy: "Streaming is unpredictable, and your best moments often disappear the second you go offline. You focus on the game, and we'll handle the rest. We go through your VODs to find the best plays, funniest glitches, and genuine reactions, then turn them into fast-paced clips perfect for TikTok and YouTube Shorts. Stop leaving views on the table. We take the content you're already making and use it to bring a massive new audience back to your live streams."
  },
  { 
    name: "Politicians", 
    slug: "politicians", 
    icon: Landmark,
    copy: "In politics, the conversation moves fast, and traditional speeches often get lost in the noise. We take your complex policy discussions, town halls, and debate moments and break them down into compelling, easy-to-digest clips. This lets you connect directly with younger voters and control the narrative as it happens. We make sure your message is heard, understood, and shared by the people who matter."
  },
  { 
    name: "Podcasters", 
    slug: "podcasters", 
    icon: Mic,
    copy: "Your 2-hour episodes are full of great moments, but it's hard to get new listeners to commit to a long show right away. We comb through your audio and video to find the best hooks, interesting takes, and deepest insights. Then, we craft highly engaging short clips that stand out on social media. We aren't just making clips for the sake of it; we're building a bridge that guides people from scrolling on their phones straight to your full episodes."
  },
  { 
    name: "YouTubers", 
    slug: "youtubers", 
    icon: MonitorPlay,
    copy: "You put dozens of hours into scripting, shooting, and editing long-form videos. Don't let them fade away after the first week. We help you get the most out of every video by slicing your existing catalog into addictive Shorts. We add engaging subtitles and fix the pacing so it perfectly fits what viewers want today. It's like having a dedicated team working in the background to bring life back to your old videos and push your subscriber count higher."
  },
  { 
    name: "Music Artists", 
    slug: "music-artists", 
    icon: Music,
    copy: "The music industry today is driven by moments, not just big label budgets. We take your unreleased tracks, raw studio sessions, and live performances, and turn them into the kind of content that sparks real trends on TikTok and Instagram. We focus on building authentic, grassroots hype around your sound. It's about turning that online excitement into real streaming numbers and a dedicated fanbase."
  },
  { 
    name: "Movies & TV", 
    slug: "movies-tv", 
    icon: Tv,
    copy: "People are getting tired of the standard, predictable trailer format. We pull the most gripping moments, high-tension scenes, and emotional hooks right from your footage to create clips that feel native to social media. By putting content right in front of where audiences are already scrolling, we help build genuine anticipation and word-of-mouth buzz long before your project actually drops."
  },
  { 
    name: "Educators", 
    slug: "educators", 
    icon: GraduationCap,
    copy: "Learning doesn't have to be boring. We take deep, complex concepts and break them down into bite-sized, visually interesting clips that people actually want to watch. Using motion graphics and great storytelling, we hook viewers who didn't even know they wanted to learn about your topic. We help you build authority in your space, which leads directly to more students, course signups, and a bigger audience for your expertise."
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
              
              <p className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground mb-12">
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
