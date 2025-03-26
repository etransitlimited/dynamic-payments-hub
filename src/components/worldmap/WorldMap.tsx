
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { drawGrid, drawConnections, drawPoints } from "./WorldMapRenderer";

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }

    // Define render function first to avoid initialization issues
    const render = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      drawGrid(ctx, canvas.width, canvas.height, isMobile ? 40 : 60);
      
      // Draw connections with animated particles
      drawConnections(ctx, canvas.width, canvas.height, time, isMobile);
      
      // Draw points with pulsing effect
      drawPoints(ctx, canvas.width, canvas.height, time, isMobile);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(render);
    };

    // Canvas sizing function (defined after render)
    const updateCanvasSize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
      
      console.log("Canvas resized:", width, "x", height);
    };

    // Set initial canvas size
    updateCanvasSize();
    
    // Start animation
    render(0);
    
    // Listen for window resize
    const handleResize = () => {
      updateCanvasSize();
      // No need to call render here as the animation frame will handle it
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 5,
        opacity: 1,
        visibility: "visible",
        display: "block",
      }}
    />
  );
};

export default WorldMap;
