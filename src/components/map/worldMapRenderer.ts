
import { worldMapData } from "./worldMapData";

interface Point {
  x: number;
  y: number;
}

// Convert longitude/latitude to x/y coordinates
const geoToCanvas = (
  lon: number, 
  lat: number, 
  width: number, 
  height: number
): Point => {
  const x = (lon + 180) * (width / 360);
  const y = (90 - lat) * (height / 180);
  return { x, y };
};

// Draw a pulsating point
const drawPoint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  time: number,
  color: string,
  glowColor: string
) => {
  // Pulse effect
  const pulseSize = 1 + Math.sin(time * 0.002) * 0.2;
  
  // Outer glow
  const gradient = ctx.createRadialGradient(
    x, y, radius * pulseSize * 0.5,
    x, y, radius * pulseSize * 3
  );
  gradient.addColorStop(0, glowColor);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.beginPath();
  ctx.arc(x, y, radius * pulseSize * 3, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Inner point
  ctx.beginPath();
  ctx.arc(x, y, radius * pulseSize, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

// Draw a curved connection line with animated particles
const drawConnection = (
  ctx: CanvasRenderingContext2D,
  p1: Point,
  p2: Point,
  time: number,
  width: number,
  color: string,
  particleColor: string,
  particleCount: number
) => {
  // Calculate control point for the curve (above the line)
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2 - Math.min(150, Math.abs(p1.x - p2.x) * 0.3);
  
  // Draw the curve
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  
  // Draw animated particles along the curve
  for (let i = 0; i < particleCount; i++) {
    const t = (i / particleCount + time * 0.0001) % 1;
    
    // Quadratic bezier formula
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    
    const px = uu * p1.x + 2 * u * t * midX + tt * p2.x;
    const py = uu * p1.y + 2 * u * t * midY + tt * p2.y;
    
    const particleSize = 1.2 * (Math.sin(t * Math.PI) * 0.5 + 0.5);
    
    ctx.beginPath();
    ctx.arc(px, py, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = particleColor;
    ctx.fill();
  }
};

// Draw the world continents
const drawContinents = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  worldMapData.continents.forEach(continent => {
    ctx.beginPath();
    
    continent.points.forEach((point, i) => {
      const { x, y } = geoToCanvas(point[1], point[0], width, height);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.closePath();
    
    // Create a gradient for the continent - increase visibility
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(70, 120, 200, 0.3)');
    gradient.addColorStop(1, 'rgba(50, 100, 180, 0.2)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add more visible continent border
    ctx.strokeStyle = 'rgba(120, 180, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
};

// Draw grid lines (latitude/longitude)
const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isMobile: boolean
) => {
  const spacing = isMobile ? 45 : 30;
  
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(100, 150, 255, 0.15)'; // Increase grid visibility
  ctx.lineWidth = 0.8;
  
  // Draw longitude lines
  for (let lon = -180; lon <= 180; lon += spacing) {
    const { x } = geoToCanvas(lon, 0, width, height);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  
  // Draw latitude lines
  for (let lat = -90; lat <= 90; lat += spacing) {
    const { y } = geoToCanvas(0, lat, width, height);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  
  ctx.stroke();
};

// Main rendering function
export const drawWorldMap = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  isMobile: boolean
) => {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw base layer with subtle gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, 'rgba(10, 30, 70, 0.1)');
  bgGradient.addColorStop(1, 'rgba(5, 25, 60, 0.1)');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw grid
  drawGrid(ctx, width, height, isMobile);
  
  // Draw continents
  drawContinents(ctx, width, height);
  
  // Increase point size for better visibility
  const pointSize = isMobile ? 2.2 : 3.5;
  const lineWidth = isMobile ? 1 : 1.5;
  const particleCount = isMobile ? 8 : 15;
  
  // Draw network connections
  worldMapData.connections.forEach(connection => {
    const p1 = worldMapData.points[connection[0]];
    const p2 = worldMapData.points[connection[1]];
    
    const point1 = geoToCanvas(p1.lng, p1.lat, width, height);
    const point2 = geoToCanvas(p2.lng, p2.lat, width, height);
    
    drawConnection(
      ctx,
      point1,
      point2,
      time,
      lineWidth,
      'rgba(120, 220, 255, 0.3)', // Brighter connection lines
      'rgba(180, 240, 255, 0.8)', // Brighter particles
      particleCount
    );
  });
  
  // Draw points (cities/hubs)
  worldMapData.points.forEach(point => {
    const { x, y } = geoToCanvas(point.lng, point.lat, width, height);
    
    drawPoint(
      ctx,
      x, y,
      pointSize,
      time + point.id * 100, // offset time for each point
      'rgba(180, 240, 255, 0.9)', // Brighter points
      'rgba(120, 220, 255, 0.5)' // Brighter glow
    );
  });
  
  // Reduce overlay opacity for better visibility
  ctx.fillStyle = 'rgba(10, 20, 40, 0.01)';
  ctx.fillRect(0, 0, width, height);
};
