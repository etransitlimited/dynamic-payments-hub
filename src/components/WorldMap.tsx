
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { worldMapData } from "./map/worldMapData";

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
      console.log("Canvas resized to:", width, "x", height);
    };

    // Initial size setup
    updateCanvasSize();

    // Handle window resize
    window.addEventListener("resize", updateCanvasSize);

    // Convert geo coordinates to canvas coordinates
    const geoToCanvas = (lng: number, lat: number): [number, number] => {
      const x = ((lng + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      return [x, y];
    };

    // Draw points (cities/hubs)
    const drawPoint = (x: number, y: number, radius: number, time: number) => {
      // Pulse effect
      const pulseSize = 1 + Math.sin(time * 0.002) * 0.2;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        x, y, radius * pulseSize * 0.5,
        x, y, radius * pulseSize * 3.5
      );
      gradient.addColorStop(0, 'rgba(170, 240, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, radius * pulseSize * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Inner point
      ctx.beginPath();
      ctx.arc(x, y, radius * pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220, 255, 255, 0.98)';
      ctx.fill();
    };

    // Draw connection between points
    const drawConnection = (x1: number, y1: number, x2: number, y2: number, time: number) => {
      // Calculate curve control point
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - Math.min(150, Math.abs(x1 - x2) * 0.3);
      
      // Draw the curve
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.strokeStyle = 'rgba(160, 240, 255, 0.6)';
      ctx.lineWidth = isMobile ? 1.5 : 2;
      ctx.stroke();
      
      // Draw animated particles along the curve
      const particleCount = isMobile ? 8 : 15;
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount + time * 0.0001) % 1;
        
        // Quadratic bezier formula
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        
        const px = uu * x1 + 2 * u * t * midX + tt * x2;
        const py = uu * y1 + 2 * u * t * midY + tt * y2;
        
        const particleSize = 1.8 * (Math.sin(t * Math.PI) * 0.5 + 0.5);
        
        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 255, 255, 0.95)';
        ctx.fill();
      }
    };

    // Draw continents
    const drawContinents = () => {
      worldMapData.continents.forEach(continent => {
        ctx.beginPath();
        
        continent.points.forEach((point, i) => {
          const [x, y] = geoToCanvas(point[1], point[0]);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.closePath();
        
        // Create a gradient for the continent
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(120, 170, 240, 0.35)');
        gradient.addColorStop(1, 'rgba(100, 150, 220, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add continent border
        ctx.strokeStyle = 'rgba(170, 220, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    // Draw grid lines
    const drawGrid = () => {
      const spacing = isMobile ? 45 : 30;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(140, 190, 255, 0.15)';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let lon = -180; lon <= 180; lon += spacing) {
        const [x] = geoToCanvas(lon, 0);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      // Draw latitude lines
      for (let lat = -90; lat <= 90; lat += spacing) {
        const [, y] = geoToCanvas(0, lat);
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      ctx.stroke();
    };

    // Main render function
    const render = (timestamp = 0) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set background
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw components
      drawGrid();
      drawContinents();
      
      // Point sizes
      const pointSize = isMobile ? 2.5 : 3.5;
      
      // Draw connections
      worldMapData.connections.forEach(connection => {
        const p1 = worldMapData.points[connection[0]];
        const p2 = worldMapData.points[connection[1]];
        
        const [x1, y1] = geoToCanvas(p1.lng, p1.lat);
        const [x2, y2] = geoToCanvas(p2.lng, p2.lat);
        
        drawConnection(x1, y1, x2, y2, timestamp);
      });
      
      // Draw points
      worldMapData.points.forEach(point => {
        const [x, y] = geoToCanvas(point.lng, point.lat);
        drawPoint(x, y, pointSize, timestamp + point.id * 100);
      });
      
      // Loop animation
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Start animation
    render();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0" style={{ zIndex: 5 }}>
      <canvas
        ref={canvasRef}
        className="block absolute inset-0 w-full h-full"
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
