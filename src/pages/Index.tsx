
import React, { lazy, Suspense } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// 正确地懒加载非关键部分以提高初始加载时间
const Features = lazy(() => import("@/components/sections/Features").then(module => ({ default: module.default })));
const UseCases = lazy(() => import("@/components/sections/UseCases").then(module => ({ default: module.default })));
const MapSection = lazy(() => import("@/components/sections/MapSection").then(module => ({ default: module.default })));
const Testimonials = lazy(() => import("@/components/sections/Testimonials").then(module => ({ default: module.default })));
const CallToAction = lazy(() => import("@/components/sections/CallToAction").then(module => ({ default: module.default })));
const Footer = lazy(() => import("@/components/sections/Footer").then(module => ({ default: module.default })));

// 优化的加载占位符
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
      
      {/* 头部/导航 - 立即加载 */}
      <Header />
      
      {/* 英雄部分 - 立即加载 */}
      <Hero />
      
      {/* 懒加载部分与优化的加载骨架 */}
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
