
import React, { useEffect, useRef } from "react";

interface FinancialCenter {
  name: string;
  lat: number;
  lng: number;
}

interface MapCanvasProps {
  width: number;
  height: number;
  onClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ width, height, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the map with particles
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
    
    // Draw the world map outline with particles
    const worldOutline = [
      [-60, -170], [-30, -170], [0, -160], [30, -140], [60, -120], 
      [75, -90], [80, -60], [75, -30], [60, 0], [45, 30], 
      [30, 60], [15, 90], [0, 120], [-15, 150], [-30, 170], 
      [-45, 180], [-60, 170], [-75, 150], [-75, 120], [-70, 90], 
      [-65, 60], [-60, 30], [-60, 0], [-60, -30], [-60, -60], 
      [-60, -90], [-60, -120], [-60, -150], [-60, -170]
    ];
    
    // Draw particles
    const numberOfParticles = 2000;
    ctx.fillStyle = "rgba(55, 155, 255, 0.6)";
    
    for (let i = 0; i < numberOfParticles; i++) {
      // Random position within an area around the map outline
      const randomIndex = Math.floor(Math.random() * worldOutline.length);
      const [baseLat, baseLng] = worldOutline[randomIndex];
      
      // Add some noise to create a cloud-like effect around the outline
      const lat = baseLat + (Math.random() - 0.5) * 20;
      const lng = baseLng + (Math.random() - 0.5) * 20;
      
      const [x, y] = mapCoordToCanvas(lat, lng);
      
      // Vary the particle size slightly
      const particleSize = Math.random() * 2 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw core financial centers with brighter particles
    const financialCenters: FinancialCenter[] = [
      { name: "Hong Kong", lat: 22.3, lng: 114.2 },
      { name: "London", lat: 51.5, lng: -0.1 },
      { name: "New York", lat: 40.7, lng: -74.0 },
      { name: "Tokyo", lat: 35.7, lng: 139.8 },
      { name: "Singapore", lat: 1.3, lng: 103.8 },
      { name: "Shanghai", lat: 31.2, lng: 121.5 },
    ];

    // Draw heat map for financial centers
    financialCenters.forEach(center => {
      const [x, y] = mapCoordToCanvas(center.lat, center.lng);
      
      // Create a radial gradient for heat effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      gradient.addColorStop(0, "rgba(255, 120, 50, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 120, 50, 0.3)");
      gradient.addColorStop(1, "rgba(255, 120, 50, 0)");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Add pulsing effect dots
      ctx.fillStyle = "rgba(255, 200, 100, 0.9)";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Animation loop for subtle movement
    let animationFrameId: number;
    
    const animate = () => {
      // Slight fade effect by drawing a semi-transparent background
      ctx.fillStyle = "rgba(10, 26, 47, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redraw some random particles to create movement effect
      ctx.fillStyle = "rgba(55, 155, 255, 0.6)";
      for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * worldOutline.length);
        const [baseLat, baseLng] = worldOutline[randomIndex];
        
        const lat = baseLat + (Math.random() - 0.5) * 20;
        const lng = baseLng + (Math.random() - 0.5) * 20;
        
        const [x, y] = mapCoordToCanvas(lat, lng);
        
        const particleSize = Math.random() * 2 + 1;
        
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Animate financial centers
      financialCenters.forEach(center => {
        const [x, y] = mapCoordToCanvas(center.lat, center.lng);
        
        // Pulsing effect
        const pulseSize = 3 + Math.sin(Date.now() * 0.003) * 2;
        
        ctx.fillStyle = "rgba(255, 200, 100, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
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
