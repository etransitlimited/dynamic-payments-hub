
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMapBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Map parameters
    const dotSize = isMobile ? 2 : 3;
    const dotSpacing = isMobile ? 15 : 25;
    const mapWidth = Math.ceil(canvas.width / dotSpacing);
    const mapHeight = Math.ceil(canvas.height / dotSpacing);
    
    // Create map dots
    const dots: { x: number; y: number; size: number; alpha: number; pulse: number }[] = [];
    
    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        // More dots towards the center, fewer at edges
        const distFromCenterX = Math.abs(x - mapWidth / 2) / (mapWidth / 2);
        const distFromCenterY = Math.abs(y - mapHeight / 2) / (mapHeight / 2);
        const distFromCenter = Math.sqrt(distFromCenterX * distFromCenterX + distFromCenterY * distFromCenterY);
        
        // Only add dots with a probability based on distance from center
        if (Math.random() > distFromCenter * 0.7) {
          dots.push({
            x: x * dotSpacing,
            y: y * dotSpacing,
            size: dotSize * (Math.random() * 0.5 + 0.5), // Vary size slightly
            alpha: Math.random() * 0.6 + 0.3, // Vary alpha
            pulse: Math.random() * 2 * Math.PI // Different pulse phase
          });
        }
      }
    }
    
    // Animation loop
    let animationId: number;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each dot
      dots.forEach(dot => {
        ctx.beginPath();
        
        // Pulsating alpha effect
        const pulseAlpha = dot.alpha * (0.7 + 0.3 * Math.sin(time * 0.001 + dot.pulse));
        
        ctx.fillStyle = `rgba(100, 170, 255, ${pulseAlpha})`; // Brighter blue color with variable alpha
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    animationId = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: 0.8, // Increased opacity
        visibility: "visible"
      }}
    />
  );
};

export default WorldMapBackground;
