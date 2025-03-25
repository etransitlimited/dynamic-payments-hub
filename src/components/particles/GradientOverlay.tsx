
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Solid background color with reduced opacity for desktop */}
      <div 
        className={`absolute inset-0 bg-[#061428] ${isMobile ? 'opacity-100' : 'opacity-30'} z-0`}
      ></div>
      
      {/* Gradient overlay with significantly reduced opacity on desktop */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] ${
          isMobile ? 'opacity-100' : 'opacity-10'
        } z-0`}
      ></div>
    </div>
  );
};

export default GradientOverlay;
