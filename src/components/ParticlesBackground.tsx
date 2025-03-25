
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/Par
ticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Ensure WorldMap is visible on desktop with high z-index */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <WorldMap />
        </div>
      )}
      {/* Particles behind the map */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticlesLayer />
      </div>
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
