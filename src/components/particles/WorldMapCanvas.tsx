
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const WorldMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;
    
    // Handle resize and set canvas dimensions
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      setDimensions({ width: innerWidth, height: innerHeight });
    };

    // Generate continents data
    const continents = [
      { name: "North America", points: generateContinentPoints(20, 15, 25, 15, 40) },
      { name: "South America", points: generateContinentPoints(25, 55, 12, 15, 30) },
      { name: "Europe", points: generateContinentPoints(48, 25, 10, 12, 25) },
      { name: "Africa", points: generateContinentPoints(50, 45, 15, 15, 35) },
      { name: "Asia", points: generateContinentPoints(68, 30, 20, 20, 45) },
      { name: "Australia", points: generateContinentPoints(82, 60, 8, 10, 20) },
    ];

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.005;
      
      // Draw background (optional)
      ctx.fillStyle = 'rgba(6, 20, 40, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw continents
      continents.forEach(continent => {
        drawContinent(ctx, continent.points, canvas.width, canvas.height, time);
      });
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);
  
  // Function to generate random points for a continent
  const generateContinentPoints = (
    centerX: number, 
    centerY: number, 
    radiusX: number, 
    radiusY: number,
    count: number
  ) => {
    const points: Array<{x: number, y: number, size: number, speed: number, phase: number}> = [];
    
    for (let i = 0; i < count; i++) {
      // Create a cluster of points around the center with random offsets
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (isMobile ? 0.8 : 1);
      const x = centerX + Math.cos(angle) * radiusX * distance;
      const y = centerY + Math.sin(angle) * radiusY * distance;
      
      // Add random variations to make it look more natural
      points.push({
        x: Math.max(0, Math.min(100, x + (Math.random() - 0.5) * 5)),
        y: Math.max(0, Math.min(100, y + (Math.random() - 0.5) * 5)),
        size: Math.random() * 0.5 + (isMobile ? 0.8 : 1.2),
        speed: Math.random() * 0.01 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }
    
    return points;
  };
  
  // Function to draw a continent
  const drawContinent = (
    ctx: CanvasRenderingContext2D,
    points: Array<{x: number, y: number, size: number, speed: number, phase: number}>,
    canvasWidth: number,
    canvasHeight: number,
    time: number
  ) => {
    const baseColor = [114, 197, 255]; // Base color for dots
    
    // Draw points
    points.forEach((point, index) => {
      const x = (point.x / 100) * canvasWidth;
      const y = (point.y / 100) * canvasHeight;
      
      // Pulsating effect
      const pulse = Math.sin(time * point.speed * 5 + point.phase) * 0.5 + 0.5;
      const size = point.size * (isMobile ? 1.5 : 2) * (0.5 + pulse * 0.5);
      
      // Draw glowing dot
      const gradientRadius = size * 3;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, gradientRadius);
      gradient.addColorStop(0, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.6 * pulse})`);
      gradient.addColorStop(1, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`);
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, gradientRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw solid dot center
      ctx.beginPath();
      ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.8 * pulse})`;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections between points
      if (index % (isMobile ? 3 : 2) === 0) {
        drawConnections(ctx, points, index, canvasWidth, canvasHeight, pulse, time);
      }
    });
  };
  
  // Function to draw connections between points
  const drawConnections = (
    ctx: CanvasRenderingContext2D,
    points: Array<{x: number, y: number, size: number, speed: number, phase: number}>,
    currentIndex: number,
    canvasWidth: number,
    canvasHeight: number,
    pulse: number,
    time: number
  ) => {
    const currentPoint = points[currentIndex];
    const x1 = (currentPoint.x / 100) * canvasWidth;
    const y1 = (currentPoint.y / 100) * canvasHeight;
    
    // Define max distance for connection
    const maxDistance = isMobile ? 100 : 150;
    
    points.forEach((point, index) => {
      if (index === currentIndex) return;
      
      const x2 = (point.x / 100) * canvasWidth;
      const y2 = (point.y / 100) * canvasHeight;
      
      // Calculate distance
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Draw connection if close enough
      if (distance < maxDistance) {
        // Calculate opacity based on distance
        const opacity = Math.min(0.15, (1 - distance / maxDistance) * 0.3) * pulse;
        
        // Draw with wave effect
        ctx.beginPath();
        ctx.strokeStyle = `rgba(78, 151, 214, ${opacity})`;
        ctx.lineWidth = isMobile ? 0.5 : 0.8;
        
        // Animate connection with wave pattern
        const waveAmplitude = isMobile ? 1 : 2;
        const segments = Math.ceil(distance / 20);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        if (distance > 50 && !isMobile) {
          // Create a wavy line for longer distances
          for (let i = 1; i <= segments; i++) {
            const ratio = i / segments;
            const waveOffset = Math.sin(time * 2 + ratio * Math.PI * 4) * waveAmplitude;
            const midX = x1 + dx * ratio;
            const midY = y1 + dy * ratio + waveOffset;
            ctx.lineTo(midX, midY);
          }
        } else {
          // Simple straight line for short distances or mobile
          ctx.lineTo(x2, y2);
        }
        
        ctx.stroke();
      }
    });
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
