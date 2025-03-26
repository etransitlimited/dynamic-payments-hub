
import React, { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { drawWorldMap } from "./map/worldMapRenderer";

const WorldMap: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();

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

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure canvas dimensions match window size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Debug log to verify rendering
    console.log("Rendering world map with dimensions:", dimensions.width, "x", dimensions.height);
    
    const render = (time: number) => {
      drawWorldMap(ctx, canvas.width, canvas.height, time, isMobile);
      animationRef.current = requestAnimationFrame(render);
    };
    
    render(0);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isMobile]);

  return (
    <div className="WorldMap" style={{ opacity: 1, visibility: 'visible' }}>
      <canvas
        ref={canvasRef}
        className="world-map-canvas"
        style={{ opacity: 1, visibility: 'visible' }}
      />
    </div>
  );
};

export default WorldMap;
