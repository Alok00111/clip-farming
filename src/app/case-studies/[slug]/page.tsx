import { notFound } from "next/navigation";
import { getCampaignBySlug, campaigns } from "@/data/campaigns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In Next.js 15, dynamic route params must be awaited if they are accessed asynchronously.
// However, in a standard server component, they are passed as a promise-like object that requires awaiting
// or accessed directly depending on Next 15 exact layout. We will use the proper Next 15 PageProps signature.
type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all known campaigns to ensure they are built at compile time
export async function generateStaticParams() {
  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const campaign = getCampaignBySlug(resolvedParams.slug);
  
  if (!campaign) {
    return { title: "Campaign Not Found" };
  }
  
  return {
    title: `${campaign.client} Case Study | Clipping Agency`,
    description: campaign.shortDescription,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const campaign = getCampaignBySlug(resolvedParams.slug);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Back Button */}
        <Link 
          href="/case-studies" 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground mb-12"
          data-cursor-hover="true"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Case Studies
        </Link>

        {/* Hero Section */}
        <div className="max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-foreground px-6 py-2 text-sm sm:text-lg font-bold uppercase tracking-wider text-background shadow-brutal">
              Client: {campaign.client}
            </div>
            {campaign.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-6xl font-black uppercase tracking-tight text-foreground sm:text-8xl lg:text-[10rem] leading-none">
            {campaign.stats}
          </h1>
          <h2 className="mt-6 font-display text-3xl font-bold uppercase text-accent sm:text-5xl">
            {campaign.metric}
          </h2>
        </div>

        {/* Results Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {campaign.results.map((result, i) => (
            <div key={i} className="rounded-3xl border border-border bg-muted/50 p-8 shadow-brutal">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{result.label}</p>
              <p className="mt-2 font-display text-4xl font-black uppercase text-foreground">{result.value}</p>
            </div>
          ))}
        </div>

        {/* Challenge vs Solution Split */}
        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-background p-10 shadow-brutal">
            <h3 className="font-display text-3xl font-bold uppercase text-foreground border-b border-border pb-4">The Challenge</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">{campaign.challenge}</p>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/50 p-10 shadow-brutal">
            <h3 className="font-display text-3xl font-bold uppercase text-accent border-b border-border pb-4">Our Solution</h3>
            <p className="text-lg leading-relaxed text-foreground">{campaign.solution}</p>
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="mt-24 flex flex-col items-center justify-center rounded-[2rem] sm:rounded-[3rem] border-2 border-border bg-muted/30 p-12 sm:p-20 text-center shadow-brutal backdrop-blur-sm">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_40px_rgba(212,255,0,0.4)] transition-transform hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-current translate-x-0.5"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
          <p className="mt-10 font-display text-3xl font-black uppercase text-foreground">Play Campaign Breakdown</p>
          <p className="mt-4 text-lg font-medium text-muted-foreground">Detailed video integration coming in Phase 6.</p>
        </div>

      </div>
    </div>
  );
}
