
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";

const ParticlesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WorldMap />
      </div>
      <GradientOverlay />
      <ParticlesLayer />
    </div>
  );
};

export default ParticlesBackground;
