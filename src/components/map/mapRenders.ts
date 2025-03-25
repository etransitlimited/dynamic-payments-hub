
import { mapCoordToCanvas } from "./mapUtils";
import { continentsData, connectionPoints, keyConnections } from "./mapData";

// Draws the base map with continents and grid
export const drawBaseMap = (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement,
  config: ReturnType<typeof import("./mapConfig").getMapConfig>,
  isMobile: boolean = false
) => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw base background
  ctx.fillStyle = config.baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw stylized continents
  continentsData.forEach(continent => {
    ctx.beginPath();
    continent.points.forEach((point, index) => {
      const [x, y] = mapCoordToCanvas(point[0], point[1], canvas.width, canvas.height);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, config.continentFillStart);
    gradient.addColorStop(1, config.continentFillEnd);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = 'rgba(65, 145, 255, 0.4)';
    ctx.shadowBlur = 5;
    ctx.strokeStyle = 'rgba(100, 180, 255, 0.4)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  });

  // Draw meridians and parallels as a grid
  ctx.beginPath();
  ctx.strokeStyle = config.gridColor;
  ctx.lineWidth = 0.5;
  
  // Use wider grid spacing for mobile
  const gridSpacing = isMobile ? config.mobileGridSpacing || 45 : 30;
  
  // Draw meridians (vertical lines)
  for (let lng = -180; lng <= 180; lng += gridSpacing) {
    const [startX, startY] = mapCoordToCanvas(90, lng, canvas.width, canvas.height);
    const [endX, endY] = mapCoordToCanvas(-90, lng, canvas.width, canvas.height);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
  }
  
  // Draw parallels (horizontal lines)
  for (let lat = -90; lat <= 90; lat += gridSpacing) {
    const [startX, startY] = mapCoordToCanvas(lat, -180, canvas.width, canvas.height);
    const [endX, endY] = mapCoordToCanvas(lat, 180, canvas.width, canvas.height);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
  }
  ctx.stroke();
};

// Draws city markers
export const drawCityMarkers = (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement,
  config: ReturnType<typeof import("./mapConfig").getMapConfig>,
  isMobile: boolean = false
) => {
  // Adjust point size for mobile
  const pointSize = isMobile ? (config.mobilePointSize || 1.2) : 1.5;
  const glowSize = isMobile ? 3 : 4;
  
  connectionPoints.forEach(point => {
    const [x, y] = mapCoordToCanvas(point.lat, point.lng, canvas.width, canvas.height);
    
    // Draw pulsing point
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2);
    ctx.fillStyle = config.pointColor;
    ctx.fill();
    
    // Draw outer glow
    ctx.beginPath();
    ctx.arc(x, y, glowSize, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(x, y, pointSize, x, y, glowSize);
    gradient.addColorStop(0, config.cityGlowStart);
    gradient.addColorStop(1, config.cityGlowEnd);
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};

// Draws a single animated connection line between two points
export const drawConnectionLine = (
  ctx: CanvasRenderingContext2D,
  point1Index: number,
  point2Index: number,
  animationSpeed: number,
  timestamp: number,
  config: ReturnType<typeof import("./mapConfig").getMapConfig>,
  canvasWidth: number,
  canvasHeight: number,
  isMobile: boolean = false
) => {
  const point1 = connectionPoints[point1Index];
  const point2 = connectionPoints[point2Index];
  
  const [x1, y1] = mapCoordToCanvas(point1.lat, point1.lng, canvasWidth, canvasHeight);
  const [x2, y2] = mapCoordToCanvas(point2.lat, point2.lng, canvasWidth, canvasHeight);
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  
  // Draw curved line
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - Math.abs(x1 - x2) * 0.2; // Curve upward
  
  ctx.quadraticCurveTo(midX, midY, x2, y2);
  ctx.strokeStyle = config.connectionColor;
  ctx.lineWidth = isMobile ? (config.mobileConnectionWidth || 0.4) : 0.5;
  ctx.stroke();
  
  // Reduce particle count on mobile for better performance
  const distanceFactor = Math.abs(x1 - x2);
  const particleCount = isMobile 
    ? Math.floor(distanceFactor / 30) // Fewer particles on mobile
    : Math.floor(distanceFactor / 20);
  
  for (let i = 0; i < particleCount; i++) {
    const t = (i / particleCount + timestamp * animationSpeed) % 1;
    const tPrime = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function
    
    const px = (1 - tPrime) * (1 - tPrime) * x1 + 2 * (1 - tPrime) * tPrime * midX + tPrime * tPrime * x2;
    const py = (1 - tPrime) * (1 - tPrime) * y1 + 2 * (1 - tPrime) * tPrime * midY + tPrime * tPrime * y2;
    
    ctx.beginPath();
    ctx.arc(px, py, isMobile ? 0.8 : 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 100, ${0.4 - Math.abs(t - 0.5) * 0.8})`;
    ctx.fill();
  }
};

// Draws all connection lines
export const drawConnections = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: ReturnType<typeof import("./mapConfig").getMapConfig>,
  animationSpeed: number,
  timestamp: number,
  isMobile: boolean = false
) => {
  keyConnections.forEach(([fromIdx, toIdx]) => {
    drawConnectionLine(
      ctx, 
      fromIdx, 
      toIdx, 
      animationSpeed,
      timestamp,
      config,
      canvas.width, 
      canvas.height,
      isMobile
    );
  });
};

// Adds a subtle overlay for "trail" effect (for background only)
export const drawOverlay = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: ReturnType<typeof import("./mapConfig").getMapConfig>
) => {
  ctx.fillStyle = `rgba(15, 36, 64, ${config.overlayOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
