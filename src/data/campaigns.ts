export interface Campaign {
  slug: string;
  client: string;
  stats: string;
  metric: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

export const campaigns: Campaign[] = [
  {
    slug: "scaling-creator-x",
    client: "Creator X",
    stats: "15M+",
    metric: "Views Across TikTok & Reels",
    shortDescription: "We scaled this lifestyle creator from 10k to 250k followers in 3 months using our aggressive retention-editing framework.",
    challenge: "Creator X had incredible on-camera presence but was uploading unedited, 60-second vlog clips. Average watch time was dropping off at the 3-second mark, meaning the algorithm was completely suppressing the content.",
    solution: "We completely overhauled the content pipeline. We implemented a 3-second visual hook strategy, aggressive B-roll cuts, and subliminal sound design to artificially inflate retention rates past 85%.",
    results: [
      { label: "Followers Gained", value: "240,000+" },
      { label: "Total Views", value: "15M+" },
      { label: "Timeframe", value: "90 Days" }
    ],
    tags: ["TikTok", "Lifestyle", "Retention Editing"]
  },
  {
    slug: "ecom-brand-y-roas",
    client: "E-com Brand Y",
    stats: "$450k",
    metric: "In Trackable Sales",
    shortDescription: "Our clippers created 500+ micro-variants of their winning ad, flooding the FYP and driving massive direct response.",
    challenge: "The brand found a winning ad creative, but ad fatigue set in after 2 weeks. CPA (Cost Per Acquisition) skyrocketed, and their internal editing team couldn't produce enough variations to keep the ads fresh.",
    solution: "We deployed 15 specialized clippers to take the raw footage and generate 500 unique micro-variants. We tested different hooks, pacing, captions, and CTA placements at absolute scale.",
    results: [
      { label: "Trackable Sales", value: "$450,000" },
      { label: "CPA Reduction", value: "62%" },
      { label: "Ad Variations", value: "500+" }
    ],
    tags: ["Paid Ads", "E-commerce", "Direct Response"]
  },
  {
    slug: "podcast-z-clips",
    client: "Podcast Z",
    stats: "5.2M",
    metric: "New Subscribers",
    shortDescription: "We extracted the most controversial hooks from their 2-hour episodes and turned them into viral 15-second loops.",
    challenge: "A 2-hour longform podcast was getting decent YouTube views, but zero discovery. Longform content rarely gets pushed to new audiences natively without short-form driving top-of-funnel traffic.",
    solution: "Our team combed through hundreds of hours of raw audio to find the most polarizing, context-free statements. We packaged these into aggressive 15-second loops with brutalist typography.",
    results: [
      { label: "New Subscribers", value: "5.2M" },
      { label: "Shorts Views", value: "120M+" },
      { label: "Conversion Rate", value: "4.3%" }
    ],
    tags: ["Podcasts", "YouTube Shorts", "Hook Engineering"]
  },
  {
    slug: "streamer-a-live",
    client: "Streamer A",
    stats: "600M+",
    metric: "Total Views",
    shortDescription: "A live-clipping pipeline pushing Twitch highlights to TikTok within 10 minutes of the live event happening.",
    challenge: "The streamer was generating incredible live moments, but clipping them out manually took hours. By the time the clips hit TikTok, the trend was dead and fan accounts had already stolen the views.",
    solution: "We built a dedicated live-clipping war room. While the streamer is live, our team is simultaneously clipping, editing, and publishing the highlights directly to TikTok with a 10-minute delay.",
    results: [
      { label: "Total Views", value: "600M+" },
      { label: "Publish Speed", value: "< 10 Mins" },
      { label: "Stolen Views Reclaimed", value: "85%" }
    ],
    tags: ["Twitch", "Live Ops", "Speed to Market"]
  },
  {
    slug: "fitness-coach-b",
    client: "Fitness Coach B",
    stats: "20M+",
    metric: "Views",
    shortDescription: "Transforming boring workout tutorials into high-energy, gamified short-form series.",
    challenge: "Educational fitness content is notoriously boring on short-form. The coach's form-correction videos were highly valuable but visually stagnant, resulting in terrible engagement.",
    solution: "We introduced a 'gamified' editing style. We added video game sound effects for correct/incorrect form, on-screen timers, and fast-paced zoom cuts to make education feel like entertainment.",
    results: [
      { label: "Total Views", value: "20M+" },
      { label: "Engagement Rate", value: "12.4%" },
      { label: "Program Sales", value: "$120k+" }
    ],
    tags: ["Fitness", "Edutainment", "Gamification"]
  },
  {
    slug: "saas-startup-c",
    client: "SaaS Startup C",
    stats: "10k+",
    metric: "Software Signups",
    shortDescription: "Using 'founder story' clips to drop Cost-Per-Acquisition by 80% on TikTok Ads.",
    challenge: "The B2B SaaS company was running traditional, highly-polished corporate ads on TikTok and burning cash with zero conversions. Users were swiping past immediately.",
    solution: "We had the founder record raw, selfie-style videos talking about the pain of building the software. We edited these to feel completely native to the platform, looking like organic posts rather than ads.",
    results: [
      { label: "New Signups", value: "10,000+" },
      { label: "CPA Drop", value: "80%" },
      { label: "Organic Reach", value: "2.1M" }
    ],
    tags: ["B2B SaaS", "Native Content", "Founder Led"]
  }
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find(c => c.slug === slug);
}
