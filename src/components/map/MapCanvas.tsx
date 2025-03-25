
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

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const config = getMapConfig(isBackground);
    const animationSpeed = getAnimationSpeed(isBackground, isMobile);

    const draw = (timestamp = performance.now()) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBaseMap(ctx, canvas, config, isMobile);
      drawCityMarkers(ctx, canvas, config, isMobile);
      drawConnections(ctx, canvas, config, animationSpeed, timestamp, isMobile);
      
      if (isBackground) {
        drawOverlay(ctx, canvas, config);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
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
      className="w-full h-full"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0,
        opacity: 1,
        zIndex: 2000, // Dramatically increased z-index to match parent
        pointerEvents: 'none',
        visibility: 'visible',
        display: 'block'
      }}
    />
  );
};

export default MapCanvas;
