
import React, { lazy, Suspense } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer").then(module => ({ default: module.default })));
const WorldMap = lazy(() => import("./WorldMap").then(module => ({ default: module.default })));

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Particles background layer */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* Gradient overlay - darker on mobile for better contrast */}
      <GradientOverlay isMobile={isMobile} />
      
      {/* World map - now showing on both mobile and desktop */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Suspense fallback={<div />}>
          <WorldMap />
        </Suspense>
      </div>
    </div>
  );
};

export default ParticlesBackground;
