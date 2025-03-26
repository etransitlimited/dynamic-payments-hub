
import React, { lazy, Suspense } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Correctly lazy load non-critical sections
const Features = lazy(() => import("@/components/sections/Features"));
const UseCases = lazy(() => import("@/components/sections/UseCases"));
const MapSection = lazy(() => import("@/components/sections/MapSection"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const CallToAction = lazy(() => import("@/components/sections/CallToAction"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Improved loading placeholder with better error boundaries
const SectionLoader = ({ height = "12", id }: { height?: string, id?: string }) => (
  <div className="container mx-auto px-4 py-4" id={id}>
    <Skeleton className={`w-full h-${height} bg-blue-900/10 rounded-lg`} />
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#061428] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/navigation - load immediately */}
      <Header />
      
      {/* Hero section - load immediately */}
      <Hero />
      
      {/* Lazy loaded sections with optimized loading skeletons */}
      <Suspense fallback={<SectionLoader height={isMobile ? "24" : "36"} id="features-loader" />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} id="usecases-loader" />}>
        <UseCases />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "24" : "32"} id="map-loader" />}>
        <MapSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} id="testimonials-loader" />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "20" : "28"} id="cta-loader" />}>
        <CallToAction />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "32" : "40"} id="footer-loader" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
