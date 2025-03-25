
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 -z-20">
      {/* Solid background color that's darker and more opaque on mobile */}
      <div 
        className={`absolute inset-0 ${isMobile ? 'bg-[#061428]' : 'bg-[#061428]/60'} z-0`}
      ></div>
      
      {/* Gradient overlay that's stronger on mobile */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] ${
          isMobile ? 'opacity-100' : 'opacity-50'
        } z-10`}
      ></div>
    </div>
  );
};

export default GradientOverlay;
