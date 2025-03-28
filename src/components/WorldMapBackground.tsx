import React, { lazy, Suspense } from "react";
import WorldMapCanvas from "./particles/WorldMapCanvas";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer"));

const WorldMapBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed inset-0 -z-9 overflow-hidden">
      {/* Particles background layer */}
      <div className="absolute inset-0" style={{ zIndex: -5 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* World map background as an independent layer */}
      <div className="absolute inset-0" style={{ zIndex: -4 }}>
        <WorldMapCanvas />
      </div>
    </div>
  );
};

export default WorldMapBackground;
