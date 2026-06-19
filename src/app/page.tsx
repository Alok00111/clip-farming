import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import VideoGrid from "@/components/VideoGrid";
import HowItWorks from "@/components/HowItWorks";
import ClipperSwarm from "@/components/ClipperSwarm";
import ForClippers from "@/components/ForClippers";
import FAQ from "@/components/FAQ";

import AmbientPath from "@/components/AmbientPath";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <VideoGrid />
      
      {/* Global Winding Path Wrapper */}
      <div className="relative overflow-hidden bg-background">
        <AmbientPath />
        <HowItWorks />
        <ClipperSwarm />
      </div>

      <div className="relative overflow-hidden bg-background">
        <ForClippers />
        <FAQ />
      </div>
    </>
  );
}
