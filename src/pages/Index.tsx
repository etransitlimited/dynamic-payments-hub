
import React, { lazy, Suspense, useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import WorldMapBackground from "@/components/WorldMapBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { useSEO } from "@/utils/seo";

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
  const { t, language } = useLanguage();
  
  // Apply SEO settings
  useSEO({
    title: t("hero.title"),
    description: t("hero.subtitle"),
  });
  
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Semantic HTML5 structure for better SEO */}
      <header>
        <Header />
      </header>
      
      {/* Animated background layers - each as a separate component */}
      <ParticlesBackground />
      <WorldMapBackground />
      
      {/* Content layers - ensuring proper z-index */}
      <main className="relative z-10">
        {/* Hero section - load immediately */}
        <Hero />
        
        {/* Lazy loaded sections with optimized loading skeletons */}
        <Suspense fallback={<SectionLoader height={isMobile ? "24" : "36"} id="features-loader" />}>
          <section aria-labelledby="features-heading">
            <Features />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} id="usecases-loader" />}>
          <section aria-labelledby="usecases-heading">
            <UseCases />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader height={isMobile ? "24" : "32"} id="map-loader" />}>
          <section aria-labelledby="map-heading">
            <MapSection />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader height={isMobile ? "36" : "48"} id="testimonials-loader" />}>
          <section aria-labelledby="testimonials-heading">
            <Testimonials />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader height={isMobile ? "20" : "28"} id="cta-loader" />}>
          <section aria-labelledby="cta-heading">
            <CallToAction />
          </section>
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader height={isMobile ? "32" : "40"} id="footer-loader" />}>
        <footer>
          <Footer />
        </footer>
      </Suspense>
    </div>
  );
};

export default Index;
