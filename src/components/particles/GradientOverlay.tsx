
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Completely transparent for desktop */}
      <div 
        className={`absolute inset-0 bg-[#061428] opacity-0 ${isMobile ? 'opacity-100' : 'opacity-0'} z-0`}
      ></div>
      
      {/* Completely transparent for desktop */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] opacity-0 ${
          isMobile ? 'opacity-100' : 'opacity-0'
        } z-0`}
      ></div>
    </div>
  );
};

export default GradientOverlay;
