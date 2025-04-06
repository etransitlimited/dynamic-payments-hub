
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import AnimationController from "./map/AnimationController";

const WorldMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  
  useEffect(() => {
    console.log("WorldMapCanvas: Initializing with performance tier:", performanceTier);
    
    // Initialize the animation controller
    if (!controllerRef.current) {
      controllerRef.current = new AnimationController(canvasRef, isMobile, performanceTier);
      controllerRef.current.init();
    } else {
      // Update existing controller with new performance tier
      controllerRef.current.updatePerformanceTier(performanceTier);
    }
    
    // Cleanup on unmount
    return () => {
      console.log("WorldMapCanvas: Cleaning up animation controller");
      if (controllerRef.current) {
        controllerRef.current.cleanup();
        controllerRef.current = null;
      }
    };
  }, [isMobile, performanceTier]);

  return (
    <canvas 
      ref={canvasRef} 
      className="world-map-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isMobile ? 0.8 : 1,
        filter: isMobile ? 'saturate(1.1) brightness(1.05)' : 'saturate(1.2) brightness(1.1)',
        willChange: 'transform', // Hint to browser to use GPU
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      aria-hidden="true" // Hide from screen readers since it's decorative
    />
  );
};

// Memoize the component to prevent unnecessary rerenders
export default React.memo(WorldMapCanvas);
