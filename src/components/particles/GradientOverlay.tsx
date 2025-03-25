
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  // 在非移动设备上，我们将完全关闭覆盖层
  if (!isMobile) {
    return null; // 完全不渲染覆盖层在桌面端
  }
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Background color - only visible for mobile */}
      <div 
        className={`absolute inset-0 bg-[#061428] transition-opacity duration-300`}
        style={{ 
          opacity: 1, // Only used on mobile now
          zIndex: 2
        }}
      ></div>
      
      {/* Gradient overlay - only visible for mobile */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] transition-opacity duration-300`}
        style={{ 
          opacity: 1, // Only used on mobile now
          zIndex: 2
        }}
      ></div>
    </div>
  );
};

export default GradientOverlay;
