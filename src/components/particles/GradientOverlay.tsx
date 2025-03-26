
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color - higher opacity for mobile */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.8 : 0.4, // Increased base opacity now that we've removed the world map
          zIndex: 0
        }}
      ></div>
      
      {/* Gradient overlay - higher opacity for mobile */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.9 : 0.5, // Adjusted opacity
          zIndex: 0
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
