
import React from "react";
import WorldMapCanvas from "./particles/WorldMapCanvas";

const WorldMapBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-9 overflow-hidden">
      {/* World map background as an independent layer */}
      <div className="absolute inset-0" style={{ zIndex: -4 }}>
        <WorldMapCanvas />
      </div>
    </div>
  );
};

export default WorldMapBackground;
