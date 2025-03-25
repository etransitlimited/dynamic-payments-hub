
import React from "react";

const GradientOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/80 to-[#071b34]/90 z-10"></div>
    </div>
  );
};

export default GradientOverlay;
