
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
  
  // Draw base layer with subtle gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, 'rgba(20, 40, 80, 0.15)');
  bgGradient.addColorStop(1, 'rgba(15, 35, 70, 0.15)');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw grid
  drawGrid(ctx, width, height, isMobile);
  
  // Draw continents
  drawContinents(ctx, width, height);
  
  // Significantly increase point size for better visibility
  const pointSize = isMobile ? 3 : 4.5; 
  const lineWidth = isMobile ? 1.5 : 2;
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
      'rgba(150, 230, 255, 0.5)', // Much brighter connection lines
      'rgba(200, 250, 255, 0.9)', // Much brighter particles
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
      'rgba(200, 250, 255, 0.95)', // Very bright points
      'rgba(150, 230, 255, 0.6)' // Brighter glow
    );
  });
};
