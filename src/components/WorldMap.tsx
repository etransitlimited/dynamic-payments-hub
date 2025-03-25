
import React, { useEffect, useState } from "react";
import MapCanvas from "./map/MapCanvas";

const WorldMap: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize(); // Initialize dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="WorldMap relative w-full h-full overflow-hidden" style={{ zIndex: 20 }}>
      <MapCanvas 
        width={dimensions.width}
        height={dimensions.height}
        onClick={() => {}} // Empty click handler for background
        isBackground={true} // Indicate this is being used as a background
      />
    </div>
  );
};

export default WorldMap;
