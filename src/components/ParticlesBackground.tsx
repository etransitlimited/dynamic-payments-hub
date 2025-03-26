
import React, { lazy, Suspense, memo } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components with increased timeout for slower connections
const ParticlesLayer = lazy(() => 
  new Promise(resolve => {
    // Prioritize UI rendering by delaying particle effects
    const timer = setTimeout(() => {
      import("./particles/ParticlesLayer").then(module => {
        clearTimeout(timer);
        resolve(module);
      });
    }, 800); // Delay particles loading by 800ms
  })
);

const WorldMap = lazy(() => 
  new Promise(resolve => {
    // Further delay WorldMap as it's less critical
    const timer = setTimeout(() => {
      import("./WorldMap").then(module => {
        clearTimeout(timer);
        resolve(module);
      });
    }, 1200); // Delay world map loading by 1.2s
  })
);

const ParticlesBackground: React.FC = memo(() => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mobile-optimized solid background color as immediate fallback */}
      <div className="absolute inset-0 bg-[#051324]"></div>
      
      {/* Particles behind everything - lazy loaded with delay */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* Gradient overlay with darker on mobile for better contrast */}
      <GradientOverlay isMobile={isMobile} />
      
      {/* World Map for desktop only with lower z-index - lazy loaded with longer delay */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Suspense fallback={<div />}>
            <WorldMap />
          </Suspense>
        </div>
      )}
    </div>
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default ParticlesBackground;
