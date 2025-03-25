
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Particles behind everything */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <ParticlesLayer />
      </div>
      
      {/* World Map for desktop only with higher z-index */}
      {!isMobile && (
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <WorldMap />
        </div>
      )}
      
      {/* Gradient overlay with different opacity based on device */}
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
