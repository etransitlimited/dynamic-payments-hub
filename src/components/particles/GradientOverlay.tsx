
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color - fully transparent for desktop, visible for mobile */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 1 : 0.1,
          zIndex: 2
        }}
      ></div>
      
      {/* Gradient overlay - fully transparent for desktop, visible for mobile */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 1 : 0.1,
          zIndex: 2
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
