
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Only show WorldMap on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <WorldMap />
        </div>
      )}
      <ParticlesLayer />
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
