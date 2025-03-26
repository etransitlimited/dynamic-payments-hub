
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color gradient with reduced opacity */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.65 : 0.25, // Further reduced opacity to make the map more visible
          zIndex: 0
        }}
      ></div>
      
      {/* Vertical gradient overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: isMobile ? 0.75 : 0.3, // Reduced opacity for better map visibility
          zIndex: 0
        }}
      ></div>
      
      {/* Radial gradient for subtle vignette effect */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(circle at center, transparent 30%, rgba(6, 20, 40, 0.3) 100%)',
          opacity: isMobile ? 0.8 : 0.5,
          zIndex: 0
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
