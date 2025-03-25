
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import worldMapData from "@/data/worldMapData";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

interface RegionData {
  id: string;
  name: string;
  coordinates: [number, number];
  merchants: string[];
}

const WorldMap = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [regions] = useState<RegionData[]>(worldMapData);
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

  // Draw the map with particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Map coordinates to canvas position
    const mapCoordToCanvas = (lat: number, lng: number): [number, number] => {
      const x = ((lng + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      return [x, y];
    };

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the world map outline with particles
    const worldOutline = [
      [-60, -170], [-30, -170], [0, -160], [30, -140], [60, -120], 
      [75, -90], [80, -60], [75, -30], [60, 0], [45, 30], 
      [30, 60], [15, 90], [0, 120], [-15, 150], [-30, 170], 
      [-45, 180], [-60, 170], [-75, 150], [-75, 120], [-70, 90], 
      [-65, 60], [-60, 30], [-60, 0], [-60, -30], [-60, -60], 
      [-60, -90], [-60, -120], [-60, -150], [-60, -170]
    ];
    
    // Draw particles
    const numberOfParticles = 2000;
    ctx.fillStyle = "rgba(55, 155, 255, 0.6)";
    
    for (let i = 0; i < numberOfParticles; i++) {
      // Random position within an area around the map outline
      const randomIndex = Math.floor(Math.random() * worldOutline.length);
      const [baseLat, baseLng] = worldOutline[randomIndex];
      
      // Add some noise to create a cloud-like effect around the outline
      const lat = baseLat + (Math.random() - 0.5) * 20;
      const lng = baseLng + (Math.random() - 0.5) * 20;
      
      const [x, y] = mapCoordToCanvas(lat, lng);
      
      // Vary the particle size slightly
      const particleSize = Math.random() * 2 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw core financial centers with brighter particles
    const financialCenters = [
      { name: "Hong Kong", lat: 22.3, lng: 114.2 },
      { name: "London", lat: 51.5, lng: -0.1 },
      { name: "New York", lat: 40.7, lng: -74.0 },
      { name: "Tokyo", lat: 35.7, lng: 139.8 },
      { name: "Singapore", lat: 1.3, lng: 103.8 },
      { name: "Shanghai", lat: 31.2, lng: 121.5 },
    ];

    // Draw heat map for financial centers
    financialCenters.forEach(center => {
      const [x, y] = mapCoordToCanvas(center.lat, center.lng);
      
      // Create a radial gradient for heat effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      gradient.addColorStop(0, "rgba(255, 120, 50, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 120, 50, 0.3)");
      gradient.addColorStop(1, "rgba(255, 120, 50, 0)");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Add pulsing effect dots
      ctx.fillStyle = "rgba(255, 200, 100, 0.9)";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw clickable regions
    regions.forEach(region => {
      const [x, y] = mapCoordToCanvas(region.coordinates[0], region.coordinates[1]);
      
      // Draw region marker
      ctx.fillStyle = "rgba(100, 200, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a subtle glow effect
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 15);
      glow.addColorStop(0, "rgba(100, 200, 255, 0.4)");
      glow.addColorStop(1, "rgba(100, 200, 255, 0)");
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    });

    // Animation loop for subtle movement
    let animationFrameId: number;
    
    const animate = () => {
      // Slight fade effect by drawing a semi-transparent background
      ctx.fillStyle = "rgba(10, 26, 47, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redraw some random particles to create movement effect
      ctx.fillStyle = "rgba(55, 155, 255, 0.6)";
      for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * worldOutline.length);
        const [baseLat, baseLng] = worldOutline[randomIndex];
        
        const lat = baseLat + (Math.random() - 0.5) * 20;
        const lng = baseLng + (Math.random() - 0.5) * 20;
        
        const [x, y] = mapCoordToCanvas(lat, lng);
        
        const particleSize = Math.random() * 2 + 1;
        
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Animate financial centers
      financialCenters.forEach(center => {
        const [x, y] = mapCoordToCanvas(center.lat, center.lng);
        
        // Pulsing effect
        const pulseSize = 3 + Math.sin(Date.now() * 0.003) * 2;
        
        ctx.fillStyle = "rgba(255, 200, 100, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, regions]);

  // Handle click event on the map
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Map coordinates to canvas position
    const canvasToMapCoord = (x: number, y: number): [number, number] => {
      const lng = (x / canvas.width) * 360 - 180;
      const lat = 90 - (y / canvas.height) * 180;
      return [lat, lng];
    };
    
    const [clickLat, clickLng] = canvasToMapCoord(x, y);
    
    // Find the closest region
    let closestRegion: RegionData | null = null;
    let minDistance = Infinity;
    
    regions.forEach(region => {
      const [regionLat, regionLng] = region.coordinates;
      
      // Calculate distance using a simple Euclidean distance
      const latDiff = clickLat - regionLat;
      const lngDiff = clickLng - regionLng;
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      
      if (distance < minDistance && distance < 15) {  // Threshold for clicking
        minDistance = distance;
        closestRegion = region;
      }
    });
    
    setSelectedRegion(closestRegion);
  };

  return (
    <div id="map-container" className="relative w-full h-full overflow-hidden rounded-lg">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
      />
      
      {regions.map(region => {
        const isSelected = selectedRegion?.id === region.id;
        return (
          <div key={region.id}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? "bg-primary scale-150 z-20" 
                      : "bg-blue-400 hover:bg-blue-300 z-10"
                  }`}
                  style={{
                    left: `${((region.coordinates[1] + 180) / 360) * 100}%`,
                    top: `${((90 - region.coordinates[0]) / 180) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedRegion(region)}
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-64 p-0">
                <Card className="bg-[#1A2A3F] text-white border-blue-500/30 overflow-hidden">
                  <h3 className="p-3 font-medium text-lg border-b border-blue-500/30">{region.name}</h3>
                  <div className="p-3">
                    <h4 className="text-sm text-blue-300 mb-2">{t("supportedMerchants")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.merchants.map((merchant, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-blue-900/50 rounded-md text-xs"
                        >
                          {merchant}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      })}
      
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        >
          <Card className="bg-[#1A2A3F]/90 backdrop-blur-sm text-white border-blue-500/30 p-4 w-80">
            <h3 className="text-lg font-medium mb-2">{selectedRegion.name}</h3>
            <div className="mb-3">
              <h4 className="text-sm text-blue-300 mb-2">{t("supportedMerchants")}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.merchants.map((merchant, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-900/50 rounded-md text-xs"
                  >
                    {merchant}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs text-blue-200">
              {t("clickMapForMoreRegions")}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default WorldMap;
