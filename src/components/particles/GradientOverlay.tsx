
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color - adjusted opacity to make map more visible */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.7 : 0.3, // Reduced opacity to make the map more visible
          zIndex: 0
        }}
      ></div>
      
      {/* Gradient overlay - adjusted opacity */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.8 : 0.4, // Reduced opacity
          zIndex: 0
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
