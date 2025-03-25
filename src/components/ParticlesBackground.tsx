
import React, { lazy, Suspense } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer"));
const WorldMap = lazy(() => import("./WorldMap"));

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Particles behind everything - lazy loaded */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={<div className="bg-[#061428] w-full h-full" />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* Gradient overlay with very low opacity for desktop */}
      <GradientOverlay isMobile={isMobile} />
      
      {/* World Map for desktop only with lower z-index - lazy loaded */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Suspense fallback={<div />}>
            <WorldMap />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ParticlesBackground;
