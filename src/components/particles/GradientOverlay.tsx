
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Main background color */}
      <div 
        className="absolute inset-0 bg-charcoal transition-opacity duration-300"
        style={{ 
          opacity: isMobile ? 0.9 : 0.8,
          zIndex: 0
        }}
      ></div>
      
      {/* Vertical dark-to-light gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-charcoal-dark via-charcoal to-charcoal-light/30 transition-opacity duration-300"
        style={{ 
          opacity: isMobile ? 0.85 : 0.7,
          zIndex: 0
        }}
      ></div>
      
      {/* Radial gradient for depth effect */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 0%, rgba(76, 29, 149, 0.1) 100%)',
          opacity: isMobile ? 0.75 : 0.6,
          zIndex: 0
        }}
      ></div>
      
      {/* Enhanced color accents */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-purple-800/5 transition-opacity duration-300"
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
          opacity: 0.03,
          zIndex: 0
        }}
      ></div>
      
      {/* Neo-glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4 bg-purple-600/5 blur-3xl rounded-full"></div>
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-purple-400/3 blur-3xl rounded-full"></div>
    </div>
  );
};

export default GradientOverlay;
