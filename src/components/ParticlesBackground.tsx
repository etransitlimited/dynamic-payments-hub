
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";
import ParticlesLayer from "./particles/ParticlesLayer";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background color - ensures we have a fallback color */}
      <div className="absolute inset-0 bg-[#061428]" style={{ zIndex: -10 }}></div>
      
      {/* Particles layer - only included in frontend/public pages */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ParticlesLayer />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GradientOverlay isMobile={isMobile} />
      </div>
    </div>
  );
};

export default ParticlesBackground;
