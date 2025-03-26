
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Simplified world map data
const mapData = {
  points: [
    { name: "New York", x: 0.25, y: 0.35 },
    { name: "London", x: 0.45, y: 0.30 },
    { name: "Tokyo", x: 0.80, y: 0.36 },
    { name: "Singapore", x: 0.75, y: 0.55 },
    { name: "Sydney", x: 0.85, y: 0.75 },
    { name: "São Paulo", x: 0.30, y: 0.65 },
    { name: "Cape Town", x: 0.52, y: 0.70 },
    { name: "Dubai", x: 0.60, y: 0.45 }
  ],
  connections: [
    [0, 1], [0, 5], [1, 3], [1, 6], [2, 3], [3, 4], [3, 7], [5, 6]
  ]
};

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

    // Helper to map data coordinates to canvas
    const mapToCanvas = (x: number, y: number) => {
      return [
        x * canvas.width,
        y * canvas.height
      ];
    };

    // Define the render function FIRST before it's used by updateCanvasSize
    const render = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a faded background grid
      ctx.beginPath();
      ctx.strokeStyle = "rgba(140, 190, 255, 0.12)";
      ctx.lineWidth = 0.5;
      
      // Adjust grid spacing for different devices
      const gridSize = isMobile ? 40 : 60;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      ctx.stroke();
      
      // Draw connections between points
      ctx.lineWidth = isMobile ? 1 : 1.5;
      
      mapData.connections.forEach(([fromIdx, toIdx]) => {
        const from = mapData.points[fromIdx];
        const to = mapData.points[toIdx];
        
        const [x1, y1] = mapToCanvas(from.x, from.y);
        const [x2, y2] = mapToCanvas(to.x, to.y);
        
        // Calculate midpoint with curve offset
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - Math.min(100, Math.abs(x2 - x1) * 0.2);
        
        // Draw curved path
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.strokeStyle = "rgba(120, 200, 255, 0.6)";
        ctx.stroke();
        
        // Draw animated particles along the path
        const particleCount = isMobile ? 2 : 4;
        
        for (let i = 0; i < particleCount; i++) {
          // Calculate position along the curve (using time for animation)
          const t = ((time * 0.0001) + (i / particleCount)) % 1;
          
          // Quadratic bezier formula
          const u = 1 - t;
          const tt = t * t;
          const uu = u * u;
          
          const px = uu * x1 + 2 * u * t * midX + tt * x2;
          const py = uu * y1 + 2 * u * t * midY + tt * y2;
          
          // Draw the particle
          ctx.beginPath();
          ctx.arc(px, py, isMobile ? 1.5 : 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180, 240, 255, 0.9)";
          ctx.fill();
        }
      });
      
      // Draw points
      mapData.points.forEach((point, idx) => {
        const [x, y] = mapToCanvas(point.x, point.y);
        
        // Pulse effect for points
        const pulseSize = 1 + Math.sin(time * 0.002 + idx) * 0.2;
        const pointSize = isMobile ? 3 : 4;
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          x, y, pointSize * 0.5,
          x, y, pointSize * 3
        );
        gradient.addColorStop(0, "rgba(140, 230, 255, 0.8)");
        gradient.addColorStop(1, "rgba(140, 200, 255, 0)");
        
        ctx.beginPath();
        ctx.arc(x, y, pointSize * 3 * pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, pointSize * pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 250, 255, 0.95)";
        ctx.fill();
      });
      
      // Continue animation
      animationRef.current = requestAnimationFrame(render);
    };

    // Now define updateCanvasSize AFTER render is defined
    const updateCanvasSize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
      
      console.log("Canvas resized:", width, "x", height);
      
      // Now we can safely call render
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      render(0);
    };

    // Set initial canvas size
    updateCanvasSize();
    
    // Listen for window resize
    window.addEventListener("resize", updateCanvasSize);
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
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
