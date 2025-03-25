
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";

const ParticlesBackground: React.FC = () => {
  return (
    <>
      <GradientOverlay />
      <ParticlesLayer />
    </>
  );
};

export default ParticlesBackground;
