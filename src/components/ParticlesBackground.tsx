
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Particles behind the map */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticlesLayer />
      </div>
      
      {/* World Map for desktop only */}
      {!isMobile && <WorldMap />}
      
      {/* Gradient overlay with different opacity based on device */}
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
