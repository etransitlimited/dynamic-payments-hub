
import React from "react";

const GradientOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20">
      {/* Increased opacity of the gradient overlay to better hide any background artifacts */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/90 to-[#071b34]/95 z-10"></div>
    </div>
  );
};

export default GradientOverlay;
