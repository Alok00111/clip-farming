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
    copy: "Customer acquisition in today's landscape shouldn't be a gamble—it should be a predictable machine. We take your core messaging, product demos, founder stories, and corporate assets, and engineer them into highly engaging, retention-optimized viral clips. By bypassing traditional marketing fatigue and banner blindness, we drastically lower your Customer Acquisition Cost (CAC). We don't just chase vanity metrics; we build genuine brand authority, establish market dominance, and turn organic, top-of-funnel attention into a relentless, scalable driver for new signups and revenue."
  },
  { 
    name: "Gamers", 
    slug: "gamers", 
    icon: Gamepad2,
    copy: "You just game; we handle the algorithm. Live streams are chaotic, unpredictable, and packed with hidden gems that disappear the moment you go offline. We meticulously review your VODs to capture the high-skill outplays, the hilarious glitches, and your most authentic reactions. Then, our editors transform them into punchy, high-energy, fast-paced gold perfectly optimized for TikTok, YouTube Shorts, and Reels. Stop leaving views on the table. We turn your passive gameplay into an active, massive top-of-funnel audience that funnels directly back to your live streams."
  },
  { 
    name: "Politicians", 
    slug: "politicians", 
    icon: Landmark,
    copy: "Modern political campaigns are won on screens, not just streets. The digital narrative moves at lightning speed, and traditional soundbites get lost in the noise. We distill your complex policy discussions, town halls, press conferences, and fiery debate moments into compelling, hard-hitting short-form content. Connect instantly with younger demographics, control the narrative in real-time, and dominate the digital battlefield with hyper-targeted organic reach. We ensure your message isn't just heard—it's amplified, shared, and impossible to ignore."
  },
  { 
    name: "Podcasters", 
    slug: "podcasters", 
    icon: Mic,
    copy: "Your 2-hour conversations are goldmines hiding in plain sight. But in an attention-starved economy, nobody discovers a new podcast by committing to a 2-hour episode. We meticulously scrub your audio and video for the perfect hooks, controversial takes, and deepest insights. Our editors craft visually dynamic, highly engaging viral assets that dominate the short-form ecosystem. We don't just build a following for your clips; we build an automated funnel that converts scrollers into dedicated listeners, driving massive traffic straight to your full episodes."
  },
  { 
    name: "YouTubers", 
    slug: "youtubers", 
    icon: MonitorPlay,
    copy: "Don't let your long-form masterpieces die a slow death after the first week of upload. You spend dozens of hours scripting, shooting, and editing—we maximize the ROI on every single video. Our retention-obsessed editors slice your existing catalog into highly addictive Shorts, adding dynamic subtitles, b-roll, and pacing adjustments that satisfy the algorithm's deepest cravings. It's exactly like having a dedicated 24/7 post-production team working relentlessly in the background to skyrocket your subscriber count, resurrect old videos, and build unstoppable channel momentum."
  },
  { 
    name: "Music Artists", 
    slug: "music-artists", 
    icon: Music,
    copy: "Stop relying on luck, playlist placements, or label budgets for your next release. The modern music industry is driven by viral moments. We take your unreleased tracks, raw behind-the-scenes studio sessions, and live performance footage, and engineer them to spark massive, organic trends on TikTok and Instagram. We build authentic, grassroots hype that embeds your sound into the culture. Our campaigns translate directly into unprecedented streaming numbers, sold-out shows, and a deeply invested, loyal fanbase."
  },
  { 
    name: "Movies & TV", 
    slug: "movies-tv", 
    icon: Tv,
    copy: "Bypass the traditional, tired trailer format. Audiences have developed immunity to standard promotional cuts. We extract the most gripping camera angles, the highest-tension cliffhangers, and the rawest emotional hooks from your footage. Our team crafts retention-optimized, natively-styled clips that keep audiences absolutely addicted from the very first second. We infiltrate the timeline organically, building massive, inescapable anticipation and fever-pitch word-of-mouth marketing long before premiere night."
  },
  { 
    name: "Educators", 
    slug: "educators", 
    icon: GraduationCap,
    copy: "We make learning highly addictive. Educational content doesn't have to be boring to be valuable. By translating deep, complex concepts into bite-sized, visually captivating viral clips, we prove every single day that knowledge can dominate the algorithm. We use motion graphics, perfect pacing, and compelling storytelling to hook viewers who didn't even know they wanted to learn. Watch your authority explode, your course enrollments surge, and your student traffic multiply as we package your expertise for maximum attention."
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
