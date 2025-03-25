
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Only show the WorldMap on desktop devices */}
      {!isMobile && (
        <div className="absolute inset-0 z-50 WorldMap-container pointer-events-none">
          <WorldMap />
        </div>
      )}
      <GradientOverlay isMobile={isMobile} />
      <ParticlesLayer />
    </div>
  );
};

export default ParticlesBackground;
