
import React, { lazy, Suspense, useState, useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical sections to improve initial load time
// Adding load delay to prioritize critical content
const Features = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/Features").then(module => {
        resolve({ default: module.default });
      });
    }, 200);
  });
});

const UseCases = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/UseCases").then(module => {
        resolve({ default: module.default });
      });
    }, 400);
  });
});

const MapSection = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/MapSection").then(module => {
        resolve({ default: module.default });
      });
    }, 600);
  });
});

const Testimonials = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/Testimonials").then(module => {
        resolve({ default: module.default });
      });
    }, 800);
  });
});

const CallToAction = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/CallToAction").then(module => {
        resolve({ default: module.default });
      });
    }, 1000);
  });
});

const Footer = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      import("@/components/sections/Footer").then(module => {
        resolve({ default: module.default });
      });
    }, 1200);
  });
});

// Optimized loading fallback with reduced animation
const SectionLoader = ({ height = "12" }: { height?: string }) => (
  <div className="container mx-auto px-4 py-2">
    <Skeleton className={`w-full h-${height} bg-blue-900/5 rounded-lg`} />
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  const [sectionsVisible, setSectionsVisible] = useState({
    features: false,
    useCases: false,
    mapSection: false,
    testimonials: false,
    callToAction: false,
    footer: false
  });
  
  // Progressively load sections as user scrolls
  useEffect(() => {
    // Define section visibility based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Adjust these values based on your layout
      if (scrollPosition > 500) setSectionsVisible(prev => ({ ...prev, features: true }));
      if (scrollPosition > 900) setSectionsVisible(prev => ({ ...prev, useCases: true }));
      if (scrollPosition > 1400) setSectionsVisible(prev => ({ ...prev, mapSection: true }));
      if (scrollPosition > 1900) setSectionsVisible(prev => ({ ...prev, testimonials: true }));
      if (scrollPosition > 2300) setSectionsVisible(prev => ({ ...prev, callToAction: true }));
      if (scrollPosition > 2600) setSectionsVisible(prev => ({ ...prev, footer: true }));
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#061428] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav - Loaded immediately */}
      <Header />
      
      {/* Hero Section - Loaded immediately */}
      <Hero />
      
      {/* Lazy-loaded sections with optimized loading skeletons */}
      {sectionsVisible.features ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "16" : "24"} />}>
          <Features />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "16" : "24"} />}
      
      {sectionsVisible.useCases ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "24" : "36"} />}>
          <UseCases />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "24" : "36"} />}
      
      {sectionsVisible.mapSection ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "20" : "28"} />}>
          <MapSection />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "20" : "28"} />}
      
      {sectionsVisible.testimonials ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "24" : "36"} />}>
          <Testimonials />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "24" : "36"} />}
      
      {sectionsVisible.callToAction ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "16" : "24"} />}>
          <CallToAction />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "16" : "24"} />}
      
      {sectionsVisible.footer ? (
        <Suspense fallback={<SectionLoader height={isMobile ? "24" : "32"} />}>
          <Footer />
        </Suspense>
      ) : <SectionLoader height={isMobile ? "24" : "32"} />}
    </div>
  );
};

export default Index;
