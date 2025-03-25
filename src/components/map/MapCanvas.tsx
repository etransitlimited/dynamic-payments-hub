
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMapConfig, getAnimationSpeed } from "./mapConfig";
import { drawBaseMap, drawCityMarkers, drawConnections, drawOverlay } from "./mapRenders";

interface MapCanvasProps {
  width: number;
  height: number;
  onClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  isBackground?: boolean;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ 
  width, 
  height, 
  onClick, 
  isBackground = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();

  // Draw the map with animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container
    canvas.width = width;
    canvas.height = height;

    // Get configuration based on usage context
    const config = getMapConfig(isBackground);
    const animationSpeed = getAnimationSpeed(isBackground, isMobile);

    // Draw function for animation frame
    const draw = (timestamp = performance.now()) => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base map (continents, grid)
      drawBaseMap(ctx, canvas, config, isMobile);
      
      // Draw city markers
      drawCityMarkers(ctx, canvas, config, isMobile);
      
      // Draw animated connection lines
      drawConnections(ctx, canvas, config, animationSpeed, timestamp, isMobile);
      
      // For background only, add subtle overlay for "trail" effect
      if (isBackground) {
        drawOverlay(ctx, canvas, config);
      }
      
      // Request next frame
      animationRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, isBackground, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      className={`w-full h-full ${isBackground ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
    />
  );
};

export default MapCanvas;
