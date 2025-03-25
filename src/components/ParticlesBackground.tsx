
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      <ParticlesLayer />
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
