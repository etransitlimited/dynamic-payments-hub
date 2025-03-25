
import React from "react";
import WorldMap from "../WorldMap";

const GradientOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#061428]/98 to-[#071b34]/98 z-10"></div>
      
      {/* Dynamic World Map Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <WorldMap />
      </div>
    </div>
  );
};

export default GradientOverlay;
