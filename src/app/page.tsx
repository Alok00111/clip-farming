import Hero from "@/components/Hero";
import BuiltForCreators from "@/components/BuiltForCreators";
import Stats from "@/components/Stats";
import VideoGrid from "@/components/VideoGrid";
import HowItWorks from "@/components/HowItWorks";
import AnatomyOfAClip from "@/components/AnatomyOfAClip";
import ForClippers from "@/components/ForClippers";
import FAQ from "@/components/FAQ";

import AmbientPath from "@/components/AmbientPath";

export default function Home() {
  return (
    <>
      <Hero />
      <BuiltForCreators />
      <Stats />
      <VideoGrid />
      
      {/* Global Winding Path Wrapper */}
      <div className="relative overflow-hidden bg-background">
        <AmbientPath />
        <HowItWorks />
        <AnatomyOfAClip />
      </div>

      <div className="relative overflow-hidden bg-background">
        <ForClippers />
        <FAQ />
      </div>
    </>
  );
}
