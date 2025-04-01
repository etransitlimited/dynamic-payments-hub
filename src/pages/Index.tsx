
import React, { lazy, Suspense, useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { useSEO } from "@/utils/seo";
import { usePerformance } from "@/hooks/use-performance";
import { progressiveLoad, createSectionLoader } from "@/utils/progressive-loading";

// Progressively load non-critical sections
const Features = progressiveLoad(
  () => import("@/components/sections/Features"),
  createSectionLoader("features-loader")
);

const UseCases = progressiveLoad(
  () => import("@/components/sections/UseCases"),
  createSectionLoader("usecases-loader", "48")
);

const MapSection = progressiveLoad(
  () => import("@/components/sections/MapSection"),
  createSectionLoader("map-loader", "32")
);

const Testimonials = progressiveLoad(
  () => import("@/components/sections/Testimonials"),
  createSectionLoader("testimonials-loader", "48")
);

const CallToAction = progressiveLoad(
  () => import("@/components/sections/CallToAction"),
  createSectionLoader("cta-loader", "28")
);

const Footer = progressiveLoad(
  () => import("@/components/sections/Footer"),
  createSectionLoader("footer-loader", "40")
);

const Index = () => {
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();
  const { performanceTier, useParallaxEffects } = usePerformance();
  
  // Apply SEO settings
  useSEO({
    title: t("hero.title"),
    description: t("hero.subtitle"),
  });
  
  // Prefetch critical resources
  useEffect(() => {
    // Prefetch other routes if we have idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        const linksToPreload = ['/login', '/register'];
        linksToPreload.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          document.head.appendChild(link);
        });
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Semantic HTML5 structure for better SEO */}
      <header>
        <Header />
      </header>
      
      {/* Animated background layers - conditionally rendered based on performance */}
      <ParticlesBackground />
      
      {/* Content layers - ensuring proper z-index */}
      <main className="relative z-10">
        {/* Hero section - load immediately */}
        <Hero />
        
        {/* Progressively loaded sections */}
        <section aria-labelledby="features-heading">
          <Features />
        </section>
        
        <section aria-labelledby="usecases-heading">
          <UseCases />
        </section>
        
        <section aria-labelledby="map-heading">
          <MapSection />
        </section>
        
        <section aria-labelledby="testimonials-heading">
          <Testimonials />
        </section>
        
        <section aria-labelledby="cta-heading">
          <CallToAction />
        </section>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
