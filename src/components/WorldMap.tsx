
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import MapCanvas from "./map/MapCanvas";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMap = () => {
  const { t } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
  const isMobile = useIsMobile();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // For mobile, ensure the map covers the full screen with the right aspect ratio
      if (isMobile) {
        // On mobile, we want to make sure the map covers the entire screen
        // with a slightly taller aspect ratio for better viewing
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        setDimensions({ width, height });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    handleResize(); // Initialize dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div className="relative w-full h-full overflow-hidden">
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
