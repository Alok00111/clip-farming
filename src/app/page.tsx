import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import VideoGrid from "@/components/VideoGrid";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import ROICalculator from "@/components/ROICalculator";
import ForClippers from "@/components/ForClippers";
import FAQ from "@/components/FAQ";

import AmbientPath from "@/components/AmbientPath";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Stats />
      <VideoGrid />
      <HowItWorks />
      
      <div className="relative overflow-hidden bg-background">
        <AmbientPath />
        <UseCases />
        <ROICalculator />
        <ForClippers />
        <FAQ />
      </div>
    </>
  );
}
