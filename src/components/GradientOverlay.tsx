
import React from "react";

interface GradientOverlayProps {
  isMobile?: boolean;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* 完全移除桌面端的背景色遮罩 */}
      <div 
        className={`absolute inset-0 bg-[#061428] ${isMobile ? 'opacity-100' : 'opacity-5'} z-0`}
      ></div>
      
      {/* 极大降低桌面端渐变遮罩的不透明度 */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#061428] to-[#071b34] ${
          isMobile ? 'opacity-100' : 'opacity-0'
        } z-0`}
      ></div>
    </div>
  );
};

export default GradientOverlay;
