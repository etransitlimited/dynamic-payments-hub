
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  // Completely disable the overlay on desktop
  if (!isMobile) {
    return null; // Don't render the overlay at all on desktop
  }
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color - only visible for mobile */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 1 : 0, // Only used on mobile
          zIndex: 2
        }}
      ></div>
      
      {/* Gradient overlay - only visible for mobile */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 1 : 0, // Only used on mobile
          zIndex: 2
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
