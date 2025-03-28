
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background color - ensures we have a fallback color */}
      <div className="absolute inset-0 bg-[#061428]" style={{ zIndex: -10 }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GradientOverlay isMobile={isMobile} />
      </div>
    </div>
  );
};

export default ParticlesBackground;
