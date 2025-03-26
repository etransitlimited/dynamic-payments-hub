
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawWorldMap();
    };

    // Initialize and handle resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // World map dot coordinates (simplified representation)
    const worldMapDots = generateWorldMapDots();
    
    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Draw the world map
    function drawWorldMap() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background (optional)
      ctx.fillStyle = 'rgba(6, 20, 40, 0)'; // Transparent background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw map dots
      const dotSize = isMobile ? 2 : 3;
      const pulseSpeed = 0.01;
      
      time += 0.01;
      
      worldMapDots.forEach(dot => {
        // Calculate position based on canvas size (responsive)
        const x = canvas.width * (dot.x / 100);
        const y = canvas.height * (dot.y / 100);
        
        // Pulse effect
        const pulseFactor = 0.3 * Math.sin(time + dot.x * pulseSpeed) + 0.7;
        const size = dotSize * pulseFactor;
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(114, 197, 255, ${0.2 + pulseFactor * 0.3})`; // Blue color with variable opacity
        ctx.fill();
      });

      // Optional: add connection lines between nearby dots
      drawConnections(ctx, worldMapDots, canvas, dotSize * 5, isMobile);
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(drawWorldMap);
    }

    // Start animation
    drawWorldMap();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Function to draw connection lines between nearby dots
  const drawConnections = (
    ctx: CanvasRenderingContext2D, 
    dots: {x: number, y: number}[], 
    canvas: HTMLCanvasElement, 
    maxDistance: number,
    isMobile: boolean
  ) => {
    // Skip some connections on mobile to improve performance
    const skipFactor = isMobile ? 3 : 1;
    
    for (let i = 0; i < dots.length; i += skipFactor) {
      const dot1 = dots[i];
      const x1 = canvas.width * (dot1.x / 100);
      const y1 = canvas.height * (dot1.y / 100);
      
      for (let j = i + 1; j < dots.length; j += skipFactor) {
        const dot2 = dots[j];
        const x2 = canvas.width * (dot2.x / 100);
        const y2 = canvas.height * (dot2.y / 100);
        
        // Calculate distance between dots
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Draw line if dots are close enough
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance); // Fade out with distance
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(78, 151, 214, ${opacity * 0.1})`;
          ctx.lineWidth = isMobile ? 0.5 : 0.8;
          ctx.stroke();
        }
      }
    }
  };

  // Generate dot positions for a simplified world map
  const generateWorldMapDots = () => {
    // This function returns a simplified array of dot positions
    // that roughly represent the world map
    // Coordinates are in percentage of screen width/height
    
    const dots = [
      // North America
      {x: 15, y: 25}, {x: 18, y: 22}, {x: 22, y: 24}, {x: 25, y: 30},
      {x: 20, y: 35}, {x: 15, y: 32}, {x: 12, y: 27}, {x: 10, y: 23},
      // South America
      {x: 25, y: 60}, {x: 27, y: 65}, {x: 24, y: 70}, {x: 22, y: 63},
      {x: 20, y: 55}, {x: 23, y: 58}, {x: 26, y: 54}, {x: 28, y: 59},
      // Europe
      {x: 48, y: 22}, {x: 52, y: 25}, {x: 50, y: 28}, {x: 45, y: 27},
      {x: 47, y: 20}, {x: 53, y: 19}, {x: 51, y: 17}, {x: 49, y: 15},
      // Africa
      {x: 48, y: 45}, {x: 52, y: 48}, {x: 49, y: 55}, {x: 45, y: 50},
      {x: 50, y: 40}, {x: 55, y: 43}, {x: 53, y: 47}, {x: 47, y: 52},
      // Asia
      {x: 68, y: 30}, {x: 72, y: 25}, {x: 75, y: 35}, {x: 70, y: 40},
      {x: 65, y: 20}, {x: 78, y: 28}, {x: 80, y: 32}, {x: 63, y: 30},
      {x: 60, y: 35}, {x: 73, y: 38}, {x: 67, y: 43}, {x: 77, y: 22},
      // Australia
      {x: 82, y: 65}, {x: 85, y: 62}, {x: 88, y: 65}, {x: 85, y: 68},
      // Add more random dots for denser effect
    ];
    
    // Add more random dots around the defined continent areas
    const addRandomDots = (baseDot: {x: number, y: number}, count: number, spreadX: number, spreadY: number) => {
      const additionalDots = [];
      for (let i = 0; i < count; i++) {
        const xOffset = (Math.random() - 0.5) * 2 * spreadX;
        const yOffset = (Math.random() - 0.5) * 2 * spreadY;
        
        additionalDots.push({
          x: Math.max(0, Math.min(100, baseDot.x + xOffset)),
          y: Math.max(0, Math.min(100, baseDot.y + yOffset))
        });
      }
      return additionalDots;
    };
    
    // Add more dots around each continent
    const extraDots: {x: number, y: number}[] = [];
    dots.forEach(dot => {
      extraDots.push(...addRandomDots(dot, 3, 6, 6));
    });
    
    return [...dots, ...extraDots];
  };

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
        opacity: 0.8
      }}
    />
  );
};

export default WorldMapCanvas;
