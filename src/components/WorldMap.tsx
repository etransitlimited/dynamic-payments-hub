
import React, { useEffect, useState } from "react";
import MapCanvas from "./map/MapCanvas";

const WorldMap: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="WorldMap w-full h-full overflow-hidden" 
         style={{ 
           position: 'fixed', 
           top: 0, 
           left: 0,
           pointerEvents: 'none',
           visibility: 'visible',
           opacity: 1,
           zIndex: 10000
         }}>
      <MapCanvas 
        width={dimensions.width}
        height={dimensions.height}
        onClick={() => {}}
        isBackground={true}
      />
    </div>
  );
};

export default WorldMap;
