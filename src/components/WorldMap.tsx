
import React, { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { drawWorldMap } from "./map/worldMapRenderer";

const WorldMap: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();

  // Force render tracking
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 0 && window.innerHeight > 0) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
        console.log("Window resized to:", window.innerWidth, "x", window.innerHeight);
      }
    };

    // Immediate resize on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Force initial render after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      forceUpdate({});
      console.log("WorldMap forced update, dimensions:", window.innerWidth, "x", window.innerHeight);
    }, 100);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      console.log("Canvas ref is not available");
      return;
    }
    
    if (dimensions.width <= 0 || dimensions.height <= 0) {
      console.log("Invalid dimensions:", dimensions.width, "x", dimensions.height);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Could not get canvas context");
      return;
    }

    // Ensure canvas dimensions match window size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Debug log to verify rendering
    console.log("Rendering world map with dimensions:", dimensions.width, "x", dimensions.height);
    
    const render = (time: number) => {
      try {
        drawWorldMap(ctx, canvas.width, canvas.height, time, isMobile);
        animationRef.current = requestAnimationFrame(render);
      } catch (error) {
        console.error("Error rendering world map:", error);
      }
    };
    
    render(0);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isMobile]);

  return (
    <div className="WorldMap fixed inset-0 w-full h-full" style={{ zIndex: 5 }}>
      <canvas
        ref={canvasRef}
        className="world-map-canvas w-full h-full absolute inset-0"
        style={{ 
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default WorldMap;
