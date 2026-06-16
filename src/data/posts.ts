export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "micro-pacing-retention",
    title: "The 3-Second Rule is Dead: Why You Need Micro-Pacing.",
    excerpt: "Everyone knows you need a hook. But what happens at second 4? Second 7? If you aren't micro-pacing, you are losing 40% of your audience before the video even starts.",
    category: "Strategy",
    readTime: "4 Min Read",
    date: "MARCH 12, 2026",
    content: `
      <p>The industry is obsessed with the first 3 seconds. "Make a crazy hook!" they scream. But what happens after the hook? Most creators drop the ball at second 4, resulting in a massive retention cliff.</p>
      <h2>The Concept of Micro-Pacing</h2>
      <p>Micro-pacing is the art of re-hooking the viewer every 2.5 to 3 seconds throughout the entire duration of the video. It's not just about visual cuts; it's about audio shifts, zoom punches, and pattern interrupts.</p>
      <p>If your editor is just chopping dead air, they aren't editing. They are just trimming. True retention engineering requires a cadence that constantly resets the viewer's attention span.</p>
      <h2>Data Over Feelings</h2>
      <p>We ran an A/B test across 500 short-form videos. Videos with micro-pacing interventions every 3 seconds saw a 42% higher completion rate compared to videos that only relied on a strong initial hook.</p>
      <p>Stop guessing. Start engineering.</p>
    `
  },
  {
    slug: "subliminal-sound-design",
    title: "Subliminal Sound Design: The Secret Weapon of 10B Views.",
    excerpt: "You don't just watch a viral video. You feel it. Here is how we use low-frequency rumbles and high-end risers to hijack the viewer's subconscious.",
    category: "Production",
    readTime: "6 Min Read",
    date: "FEBRUARY 28, 2026",
    content: `
      <p>Most editors treat sound design as an afterthought. A whoosh here, a pop there. But elite retention engineers know that audio is 50% of the emotional experience.</p>
      <h2>Hijacking the Subconscious</h2>
      <p>Subliminal sound design means using audio cues that the viewer doesn't consciously notice, but physically reacts to. We're talking about 40Hz sub-rumbles under tension points, or barely audible high-frequency risers leading up to a punchline.</p>
      <p>When someone says, "I don't know why, but this video is just so satisfying to watch," they are usually reacting to the sound design.</p>
      <h2>The Stack</h2>
      <p>Every video that leaves our agency has a minimum of 4 audio layers: Dialogue, Ambience/Music, Hard FX (impacts/whooshes), and Subliminal FX (tension/release). If your editor isn't doing this, you are leaving views on the table.</p>
    `
  },
  {
    slug: "algorithm-survival-guide",
    title: "How to Survive the Latest TikTok Algorithm Update.",
    excerpt: "Reach is down across the board. The era of low-effort dancing is over. Here is the exact framework we are using to push our clients through the algorithmic bottleneck.",
    category: "Algorithm",
    readTime: "5 Min Read",
    date: "JANUARY 15, 2026",
    content: `
      <p>The latest algorithmic updates across TikTok and Instagram Reels have absolutely decimated lazy creators. If your strategy is "post 3 times a day and hope," you are already dead.</p>
      <h2>The Shift to Watch Time Quality</h2>
      <p>The algorithm is no longer just looking at completion rate. It's looking at rewatch loops, share velocity in dark social (DMs), and the depth of engagement in the comments.</p>
      <h2>Our Survival Framework</h2>
      <p>To break through the new algorithmic ceiling, you must adopt a multi-variant testing approach. We test 3 different hooks for the same piece of core content within the first hour of posting. The variant that shows the highest share-velocity gets scaled with ad spend, while the others are killed.</p>
      <p>Don't complain about the algorithm. Learn the new rules and exploit them.</p>
    `
  }
];
