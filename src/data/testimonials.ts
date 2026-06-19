export interface Testimonial {
  id: string;
  category: string;
  quote: string;
  name: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  // Public Figures
  {
    id: "pf-1",
    category: "public-figures",
    quote: "Working with this team completely changed my online presence. My personal brand skyrocketed without me lifting a finger.",
    name: "James L.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "pf-2",
    category: "public-figures",
    quote: "I can finally focus on my core work while they handle making me go viral on every platform simultaneously.",
    name: "Aisha M.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "pf-3",
    category: "public-figures",
    quote: "They understand the nuances of personal branding perfectly. My organic reach has never been stronger.",
    name: "Rohan M.",
    avatar: "https://i.pravatar.cc/150?img=61",
  },
  
  // Brands/Startups
  {
    id: "bs-1",
    category: "brands-startups",
    quote: "We drastically lowered our customer acquisition cost. Organic content is now our biggest driver for new signups.",
    name: "Marcus T.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "bs-2",
    category: "brands-startups",
    quote: "Our brand authority exploded. They took our dry corporate messaging and turned it into highly engaging viral clips.",
    name: "Elena R.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "bs-3",
    category: "brands-startups",
    quote: "The ROI on their content engine is unmatched. Our startup gained incredible visibility entirely organically.",
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/150?img=20",
  },

  // Gamers
  {
    id: "g-1",
    category: "gamers",
    quote: "They perfectly captured my chaotic streams and turned them into absolute gold for TikTok. My audience keeps growing.",
    name: "Kai V.",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: "g-2",
    category: "gamers",
    quote: "I just game. They handle the rest. The edits are insanely fast, punchy, and exactly what the algorithm wants.",
    name: "Sam J.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "g-3",
    category: "gamers",
    quote: "My stream highlights used to go unnoticed. Now, every single clip they touch pulls in massive engagement.",
    name: "Karan D.",
    avatar: "https://i.pravatar.cc/150?img=53",
  },

  // Politicians
  {
    id: "po-1",
    category: "politicians",
    quote: "They managed to distill complex policy discussions into incredibly compelling short-form content. An essential partner for any campaign.",
    name: "Robert D.",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
  {
    id: "po-2",
    category: "politicians",
    quote: "Connecting with younger demographics seemed impossible until we started using this network. The engagement has been phenomenal.",
    name: "Sarah W.",
    avatar: "https://i.pravatar.cc/150?img=44",
  },

  // Podcasters
  {
    id: "pd-1",
    category: "podcasters",
    quote: "My podcast clips are everywhere now. They know exactly which moments will hook a viewer and make them want to listen to the full episode.",
    name: "David K.",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: "pd-2",
    category: "podcasters",
    quote: "We used to struggle with discoverability. This team completely solved that by dominating the short-form ecosystem.",
    name: "Chloe S.",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: "pd-3",
    category: "podcasters",
    quote: "Finding the perfect hook is an art, and they have mastered it. My listener base has grown purely from their brilliant edits.",
    name: "Neha K.",
    avatar: "https://i.pravatar.cc/150?img=35",
  },

  // YouTubers
  {
    id: "yt-1",
    category: "youtubers",
    quote: "The team repurposes my long-form videos so seamlessly. It's like having a massive dedicated team working around the clock.",
    name: "Liam O.",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: "yt-2",
    category: "youtubers",
    quote: "My subscriber count grew faster than ever once we started pushing the shorts they edited. Absolute game changer.",
    name: "Mia B.",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: "yt-3",
    category: "youtubers",
    quote: "Their retention editing techniques are unbelievable. Every single short they cut performs exceptionally well.",
    name: "Vikram P.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },

  // Music Artists
  {
    id: "ma-1",
    category: "music-artists",
    quote: "They took my unreleased tracks and sparked massive organic trends. The promo feels natural and completely authentic.",
    name: "Jalen N.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "ma-2",
    category: "music-artists",
    quote: "Before this, marketing my music felt like a chore. Now, they handle the heavy lifting and the results speak for themselves.",
    name: "Olivia H.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "ma-3",
    category: "music-artists",
    quote: "The way they build hype around a drop using short-form content is incredible. My streams have never been higher.",
    name: "Ananya M.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },

  // Movies & TV
  {
    id: "mtv-1",
    category: "movies-tv",
    quote: "They found angles and hooks in our footage that completely bypassed traditional marketing fatigue. Viewers are obsessed.",
    name: "Ethan C.",
    avatar: "https://i.pravatar.cc/150?img=61",
  },
  {
    id: "mtv-2",
    category: "movies-tv",
    quote: "Building hype for our premieres has never been easier. The retention editing keeps audiences hooked from the very first second.",
    name: "Sophia P.",
    avatar: "https://i.pravatar.cc/150?img=26",
  },

  // Educators
  {
    id: "ed-1",
    category: "educators",
    quote: "I thought educational content couldn't go viral. They proved me wrong by making learning highly addictive.",
    name: "Dr. Alan T.",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "ed-2",
    category: "educators",
    quote: "My courses have never seen this much traffic. They know exactly how to package information for maximum attention.",
    name: "Jessica L.",
    avatar: "https://i.pravatar.cc/150?img=41",
  },
  {
    id: "ed-3",
    category: "educators",
    quote: "Translating deep concepts into bite-sized viral clips is their superpower. My student enrollment has surged.",
    name: "Dr. Arjun D.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];
