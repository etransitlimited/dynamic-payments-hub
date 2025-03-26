
import React, { lazy, Suspense } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";
import WorldMap from "./WorldMap"; // Import directly to ensure loading

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer"));

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
      
      {/* World map - non-lazy loaded */}
      <WorldMap />
      
      {/* Gradient overlay - darker on mobile for better contrast */}
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
