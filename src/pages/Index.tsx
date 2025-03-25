
import React, { lazy, Suspense } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical sections to improve initial load time
const Features = lazy(() => import("@/components/sections/Features"));
const UseCases = lazy(() => import("@/components/sections/UseCases"));
const MapSection = lazy(() => import("@/components/sections/MapSection"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const CallToAction = lazy(() => import("@/components/sections/CallToAction"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Optimized loading fallback
const SectionLoader = ({ height = "12" }: { height?: string }) => (
  <div className="container mx-auto px-4 py-4">
    <Skeleton className={`w-full h-${height} bg-blue-900/10 rounded-lg`} />
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#061428] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav - Loaded immediately */}
      <Header />
      
      {/* Hero Section - Loaded immediately */}
      <Hero />
      
      {/* Lazy-loaded sections with optimized loading skeletons */}
      <Suspense fallback={<SectionLoader height={isMobile ? "24" : "36"} />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} />}>
        <UseCases />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "24" : "32"} />}>
        <MapSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "20" : "28"} />}>
        <CallToAction />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "32" : "40"} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
