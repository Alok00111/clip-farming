import { Metadata } from "next";
import { campaigns } from "@/data/campaigns";
import CaseStudiesList from "./CaseStudiesList";

export const metadata: Metadata = {
  title: "Case Studies | Clipping Agency",
  description: "See the viral results we've achieved for our clients.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            The Proof is in <br />
            <span className="text-muted-foreground">The Data.</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We don't just talk about going viral. We engineer it daily. Here are some of our most explosive campaigns.
          </p>
        </div>

        <CaseStudiesList campaigns={campaigns} />
      </div>
    </div>
  );
}
