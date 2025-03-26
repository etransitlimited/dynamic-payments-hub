
import React, { lazy, Suspense } from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer"));

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background color - ensures we have a fallback color */}
      <div className="absolute inset-0 bg-[#061428]" style={{ zIndex: -10 }}></div>
      
      {/* Particles background layer */}
      <div className="absolute inset-0" style={{ zIndex: -5 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GradientOverlay isMobile={isMobile} />
      </div>
    </div>
  );
};

export default ParticlesBackground;
