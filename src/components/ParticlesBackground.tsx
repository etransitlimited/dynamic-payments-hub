
import React from "react";
import GradientOverlay from "./particles/GradientOverlay";
import ParticlesLayer from "./particles/ParticlesLayer";
import WorldMap from "./WorldMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* 优先显示世界地图，在桌面端提高z-index */}
      {!isMobile && (
        <div className="absolute inset-0 -z-20 pointer-events-none" style={{ zIndex: 10 }}>
          <WorldMap />
        </div>
      )}
      {/* 将粒子层的z-index降低 */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <ParticlesLayer />
      </div>
      <GradientOverlay isMobile={isMobile} />
    </div>
  );
};

export default ParticlesBackground;
