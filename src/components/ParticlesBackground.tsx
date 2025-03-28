
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background color - ensures we have a fallback color */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#051324] via-[#071e3c] to-[#082244]" style={{ zIndex: -10 }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <GradientOverlay isMobile={isMobile} />
      </div>
      
      {/* Add blue glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-2/3 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default ParticlesBackground;
