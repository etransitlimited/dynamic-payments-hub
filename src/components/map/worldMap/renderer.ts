
import { geoToCanvas } from "./coordinates";
import { drawPoint, drawConnection, drawContinents, drawGrid } from "./drawElements";
import { worldMapData } from "../worldMapData";

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
  
  // Draw base layer with subtle gradient - make it more visible
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, 'rgba(30, 50, 90, 0.25)');
  bgGradient.addColorStop(1, 'rgba(25, 45, 80, 0.25)');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw grid with increased visibility
  drawGrid(ctx, width, height, isMobile);
  
  // Draw continents with increased opacity
  drawContinents(ctx, width, height);
  
  // Significantly increase point size and brightness for better visibility
  const pointSize = isMobile ? 4 : 5.5; 
  const lineWidth = isMobile ? 2 : 2.5;
  const particleCount = isMobile ? 10 : 18;
  
  // Draw network connections with increased brightness
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
      'rgba(160, 240, 255, 0.7)', // Much brighter connection lines
      'rgba(220, 255, 255, 0.95)', // Much brighter particles
      particleCount
    );
  });
  
  // Draw points (cities/hubs) with higher visibility
  worldMapData.points.forEach(point => {
    const { x, y } = geoToCanvas(point.lng, point.lat, width, height);
    
    drawPoint(
      ctx,
      x, y,
      pointSize,
      time + point.id * 100, // offset time for each point
      'rgba(220, 255, 255, 0.98)', // Very bright points
      'rgba(170, 240, 255, 0.8)' // Brighter glow
    );
  });
};
