
import React, { useEffect, useRef } from "react";

interface MapCanvasProps {
  width: number;
  height: number;
  onClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ width, height, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the map with a new visualization approach
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Map coordinates to canvas position
    const mapCoordToCanvas = (lat: number, lng: number): [number, number] => {
      const x = ((lng + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      return [x, y];
    };

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw base background
    ctx.fillStyle = "rgba(15, 36, 64, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stylized continents
    const continents = [
      { // North America
        points: [
          [60, -170], [70, -140], [60, -90], [50, -75], 
          [45, -80], [30, -85], [20, -100], [15, -120], [40, -130], [60, -170]
        ]
      },
      { // South America
        points: [
          [15, -80], [5, -75], [-10, -75], [-20, -70], [-30, -70], 
          [-40, -65], [-55, -70], [-50, -75], [-40, -80], [-30, -85], 
          [-20, -65], [-10, -60], [0, -65], [10, -80], [15, -80]
        ]
      },
      { // Europe
        points: [
          [35, -10], [40, 0], [45, 10], [50, 15], [55, 20], 
          [60, 30], [65, 40], [60, 50], [55, 40], [50, 30], 
          [45, 25], [40, 20], [35, 10], [35, -10]
        ]
      },
      { // Africa
        points: [
          [35, -10], [30, 0], [20, 20], [10, 40], [0, 45], 
          [-10, 40], [-20, 35], [-30, 20], [-35, 15], [-30, 0], 
          [-15, -15], [0, -15], [15, -15], [25, -10], [35, -10]
        ]
      },
      { // Asia
        points: [
          [45, 25], [50, 40], [60, 60], [70, 80], [65, 100], 
          [55, 120], [45, 130], [35, 140], [25, 125], [20, 110], 
          [15, 95], [10, 80], [25, 65], [30, 50], [35, 40], [45, 25]
        ]
      },
      { // Australia
        points: [
          [-10, 110], [-20, 120], [-30, 130], [-35, 140], [-30, 150], 
          [-20, 150], [-15, 140], [-10, 130], [-5, 120], [-10, 110]
        ]
      }
    ];

    // Draw glowing continents
    continents.forEach(continent => {
      ctx.beginPath();
      continent.points.forEach((point, index) => {
        const [x, y] = mapCoordToCanvas(point[0], point[1]);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      
      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(55, 125, 255, 0.6)");
      gradient.addColorStop(1, "rgba(30, 85, 170, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = 'rgba(65, 145, 255, 0.8)';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });

    // Draw meridians and parallels as a grid
    ctx.beginPath();
    ctx.strokeStyle = "rgba(55, 125, 255, 0.15)";
    ctx.lineWidth = 1;
    
    // Draw meridians (vertical lines)
    for (let lng = -180; lng <= 180; lng += 30) {
      const [startX, startY] = mapCoordToCanvas(90, lng);
      const [endX, endY] = mapCoordToCanvas(-90, lng);
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    
    // Draw parallels (horizontal lines)
    for (let lat = -90; lat <= 90; lat += 30) {
      const [startX, startY] = mapCoordToCanvas(lat, -180);
      const [endX, endY] = mapCoordToCanvas(lat, 180);
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    ctx.stroke();

    // Connection lines animation
    const connectionPoints = [
      { name: "New York", lat: 40.7, lng: -74.0 },
      { name: "London", lat: 51.5, lng: -0.1 },
      { name: "Hong Kong", lat: 22.3, lng: 114.2 },
      { name: "Singapore", lat: 1.3, lng: 103.8 },
      { name: "Tokyo", lat: 35.7, lng: 139.8 },
      { name: "Shanghai", lat: 31.2, lng: 121.5 },
      { name: "Dubai", lat: 25.2, lng: 55.3 },
      { name: "Sydney", lat: -33.9, lng: 151.2 },
      { name: "Mumbai", lat: 19.1, lng: 72.9 }
    ];

    // Draw city markers
    connectionPoints.forEach(point => {
      const [x, y] = mapCoordToCanvas(point.lat, point.lng);
      
      // Draw pulsing point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
      ctx.fill();
      
      // Draw outer glow
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(x, y, 3, x, y, 8);
      gradient.addColorStop(0, 'rgba(255, 200, 100, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Draw connection lines between major financial hubs
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.3)';
    ctx.lineWidth = 1;
    
    // Function to draw animated line between two points
    const drawConnectionLine = (point1: typeof connectionPoints[0], point2: typeof connectionPoints[0]) => {
      const [x1, y1] = mapCoordToCanvas(point1.lat, point1.lng);
      const [x2, y2] = mapCoordToCanvas(point2.lat, point2.lng);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      // Draw curved line
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - Math.abs(x1 - x2) * 0.2; // Curve upward
      
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.stroke();
      
      // Draw animated particles along the path
      const particleCount = Math.floor(Math.abs(x1 - x2) / 20);
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount + performance.now() * 0.0001) % 1;
        const tPrime = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function
        
        const px = (1 - tPrime) * (1 - tPrime) * x1 + 2 * (1 - tPrime) * tPrime * midX + tPrime * tPrime * x2;
        const py = (1 - tPrime) * (1 - tPrime) * y1 + 2 * (1 - tPrime) * tPrime * midY + tPrime * tPrime * y2;
        
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${0.8 - Math.abs(t - 0.5) * 1.6})`;
        ctx.fill();
      }
    };
    
    // Draw some key global connections
    drawConnectionLine(connectionPoints[0], connectionPoints[1]); // NY to London
    drawConnectionLine(connectionPoints[1], connectionPoints[2]); // London to HK
    drawConnectionLine(connectionPoints[2], connectionPoints[4]); // HK to Tokyo
    drawConnectionLine(connectionPoints[2], connectionPoints[3]); // HK to Singapore
    drawConnectionLine(connectionPoints[0], connectionPoints[6]); // NY to Dubai
    drawConnectionLine(connectionPoints[6], connectionPoints[8]); // Dubai to Mumbai
    drawConnectionLine(connectionPoints[3], connectionPoints[7]); // Singapore to Sydney

    // Animation loop for constant movement
    let animationFrameId: number;
    
    const animate = () => {
      // Redraw only the animated elements
      // We use a semi-transparent overlay to create trail effect
      ctx.fillStyle = "rgba(15, 36, 64, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redraw connection lines with animation
      connectionPoints.forEach((point1, i) => {
        connectionPoints.forEach((point2, j) => {
          if (i < j && j - i === 1 || (i === 0 && j === connectionPoints.length - 1)) {
            drawConnectionLine(point1, point2);
          }
        });
      });
      
      // Redraw pulsing points with animation
      connectionPoints.forEach(point => {
        const [x, y] = mapCoordToCanvas(point.lat, point.lng);
        
        const pulseSize = 3 + Math.sin(Date.now() * 0.003) * 1.5;
        
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
        ctx.fill();
        
        // Outer glow with pulsing effect
        ctx.beginPath();
        ctx.arc(x, y, 8 + Math.sin(Date.now() * 0.003) * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, pulseSize, x, y, 8 + Math.sin(Date.now() * 0.003) * 2);
        gradient.addColorStop(0, 'rgba(255, 200, 100, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      className="w-full h-full cursor-pointer"
    />
  );
};

export default MapCanvas;
