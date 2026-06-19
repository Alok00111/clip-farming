"use client";

import { motion, Variants } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";
import { UserCircle2, Briefcase, Gamepad2, Landmark, Mic, MonitorPlay, Music, Tv, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Public Figures", slug: "public-figures", icon: UserCircle2 },
  { name: "Brands/Startups", slug: "brands-startups", icon: Briefcase },
  { name: "Gamers", slug: "gamers", icon: Gamepad2 },
  { name: "Politicians", slug: "politicians", icon: Landmark },
  { name: "Podcasters", slug: "podcasters", icon: Mic },
  { name: "YouTubers", slug: "youtubers", icon: MonitorPlay },
  { name: "Music Artists", slug: "music-artists", icon: Music },
  { name: "Movies & TV", slug: "movies-tv", icon: Tv },
  { name: "Educators", slug: "educators", icon: GraduationCap },
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
  
  const [activeCategory, setActiveCategory] = useState(urlCategory || defaultCategory);

  // Sync state if URL changes
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const handleTabClick = (slug: string) => {
    setActiveCategory(slug);
    router.push(`/blog?category=${slug}`, { scroll: false });
  };

  const activeTestimonials = testimonials.filter(t => t.category === activeCategory);

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
            Don't just take our word for it. See how we've scaled every type of creator in the ecosystem.
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

          {/* Testimonials Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid gap-8 md:grid-cols-2">
              {activeTestimonials.length > 0 ? (
                activeTestimonials.map((testimonial) => (
                  <motion.div 
                    key={testimonial.id} 
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col justify-between rounded-3xl border-4 border-border bg-muted/30 p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_var(--accent)]"
                  >
                    <div className="mb-8">
                      <svg className="h-10 w-10 text-accent mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xl font-medium leading-relaxed text-foreground">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 border-t-2 border-border/50 pt-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-14 w-14 rounded-full border-2 border-accent object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-1">
                          {categories.find(c => c.slug === testimonial.category)?.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-20 text-muted-foreground font-medium text-lg border-2 border-dashed border-border rounded-3xl">
                  No testimonials found for this category yet.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
