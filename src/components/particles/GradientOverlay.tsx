
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Solid background color with adjusted opacity for desktop */}
      <div 
        className={`absolute inset-0 bg-[#061428] ${isMobile ? 'opacity-100' : 'opacity-75'} z-0`}
      ></div>
      
      {/* Gradient overlay with reduced opacity on desktop */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] ${
          isMobile ? 'opacity-100' : 'opacity-40'
        } z-0`}
      ></div>
    </div>
  );
};

export default GradientOverlay;
