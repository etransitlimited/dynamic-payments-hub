
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import worldMapData from "@/data/worldMapData";
import MapCanvas from "./map/MapCanvas";
import { RegionData } from "./map/types";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMap = () => {
  const { t } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
  const isMobile = useIsMobile();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("map-container");
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetWidth * 0.5, // Maintain aspect ratio
        });
      } else {
        // If container not found, use window dimensions
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    handleResize(); // Initialize dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="map-container" className="relative w-full h-full overflow-hidden">
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
