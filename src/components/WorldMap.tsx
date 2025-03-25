
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import worldMapData from "@/data/worldMapData";
import MapCanvas from "./map/MapCanvas";
import MapMarker from "./map/MapMarker";
import RegionDetail from "./map/RegionDetail";
import { RegionData } from "./map/types";
import { canvasToMapCoord, calculateDistance } from "./map/mapUtils";

const WorldMap = () => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [regions] = useState<RegionData[]>(worldMapData as RegionData[]);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("map-container");
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetWidth * 0.5, // Maintain aspect ratio
        });
      }
    };

    handleResize(); // Initialize dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click event on the map
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Map coordinates to canvas position
    const [clickLat, clickLng] = canvasToMapCoord(x, y, canvas.width, canvas.height);
    
    // Find the closest region
    let closestRegion: RegionData | null = null;
    let minDistance = Infinity;
    
    regions.forEach(region => {
      const [regionLat, regionLng] = region.coordinates;
      const distance = calculateDistance(clickLat, clickLng, regionLat, regionLng);
      
      if (distance < minDistance && distance < 15) {  // Threshold for clicking
        minDistance = distance;
        closestRegion = region;
      }
    });
    
    setSelectedRegion(closestRegion);
  };

  return (
    <div id="map-container" className="relative w-full h-full overflow-hidden rounded-lg">
      <MapCanvas 
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleCanvasClick}
      />
      
      {regions.map(region => {
        const isSelected = selectedRegion?.id === region.id;
        return (
          <MapMarker
            key={region.id}
            region={region}
            isSelected={isSelected}
            onClick={() => setSelectedRegion(region)}
            screenPosition={{
              left: `${((region.coordinates[1] + 180) / 360) * 100}%`,
              top: `${((90 - region.coordinates[0]) / 180) * 100}%`,
            }}
          />
        );
      })}
      
      {selectedRegion && <RegionDetail region={selectedRegion} />}
    </div>
  );
};

export default WorldMap;
