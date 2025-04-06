
import React, { lazy, Suspense, useEffect, useState } from "react";
import WorldMapCanvas from "./particles/WorldMapCanvas";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load non-critical components
const ParticlesLayer = lazy(() => import("./particles/ParticlesLayer"));

const WorldMapBackground: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay rendering of background elements slightly for better page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) {
    return <div className={`fixed inset-0 -z-9 ${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'}`} />;
  }
  
  return (
    <div className="fixed inset-0 -z-9 overflow-hidden">
      {/* Particles background layer */}
      <div className="absolute inset-0" style={{ zIndex: -5 }}>
        <Suspense fallback={<div className={`${isMobile ? 'bg-[#051324]' : 'bg-[#061428]'} w-full h-full`} />}>
          <ParticlesLayer />
        </Suspense>
      </div>
      
      {/* World map background as an independent layer */}
      <div className="absolute inset-0" style={{ zIndex: -4 }}>
        <WorldMapCanvas />
      </div>
    </div>
  );
};

export default React.memo(WorldMapBackground);
