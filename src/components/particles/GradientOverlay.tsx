
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Main background color with adjusted opacity */}
      <div 
        className="absolute inset-0 bg-[#061428] transition-opacity duration-300"
        style={{ 
          opacity: isMobile ? 0.7 : 0.4,
          zIndex: 0
        }}
      ></div>
      
      {/* Vertical dark-to-light gradient from top - enhanced colors */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#051324] via-[#071e3c]/70 to-transparent transition-opacity duration-300"
        style={{ 
          opacity: isMobile ? 0.85 : 0.7,
          zIndex: 0
        }}
      ></div>
      
      {/* Radial gradient for depth effect - more pronounced */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(11, 50, 87, 0.2) 0%, rgba(6, 25, 50, 0.6) 100%)',
          opacity: isMobile ? 0.75 : 0.6,
          zIndex: 0
        }}
      ></div>
      
      {/* Enhanced color accents */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-[#0c4a6e]/20 via-transparent to-[#0369a1]/10 transition-opacity duration-300"
        style={{ 
          opacity: isMobile ? 0.5 : 0.7,
          zIndex: 0
        }}
      ></div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          opacity: 0.04, // Slightly more visible
          zIndex: 0
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
