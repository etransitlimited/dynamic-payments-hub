
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimationController from "./map/AnimationController";

const WorldMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize the animation controller
    const controller = new AnimationController(canvasRef, isMobile);
    controller.init();
    
    // Cleanup on unmount
    return () => {
      controller.cleanup();
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      className="world-map-canvas optimize-hardware"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isMobile ? 0.8 : 1, // Increased opacity for better visibility
        filter: 'saturate(1.2) brightness(1.1)', // Enhanced colors
      }}
    />
  );
};

export default WorldMapCanvas;
