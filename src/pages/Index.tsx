
import React, { lazy, Suspense } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";

// Lazy load non-critical sections to improve initial load time
const Features = lazy(() => import("@/components/sections/Features"));
const UseCases = lazy(() => import("@/components/sections/UseCases"));
const MapSection = lazy(() => import("@/components/sections/MapSection"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const CallToAction = lazy(() => import("@/components/sections/CallToAction"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Simple loading fallback
const SectionLoader = () => <div className="py-10 bg-blue-900/10 animate-pulse rounded-lg my-4"></div>;

const Index = () => {
  return (
    <div className="min-h-screen bg-[#061428] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav - Loaded immediately */}
      <Header />
      
      {/* Hero Section - Loaded immediately */}
      <Hero />
      
      {/* Lazy-loaded sections - These load as user scrolls */}
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <UseCases />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <MapSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CallToAction />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
