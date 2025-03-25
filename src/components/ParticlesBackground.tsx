
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Only render WorldMap for desktop and ensure it has the highest z-index */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50 }}>
          <WorldMap />
        </div>
      )}
      {/* Particles go behind the map */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticlesLayer />
      </div>
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
