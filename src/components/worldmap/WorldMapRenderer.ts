
// Helper functions for world map rendering

// Helper to map data coordinates to canvas
export const mapToCanvas = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
  return [
    x * canvasWidth,
    y * canvasHeight
  ];
};

// Simplified world map data
export const mapData = {
  points: [
    { name: "New York", x: 0.25, y: 0.35 },
    { name: "London", x: 0.45, y: 0.30 },
    { name: "Tokyo", x: 0.80, y: 0.36 },
    { name: "Singapore", x: 0.75, y: 0.55 },
    { name: "Sydney", x: 0.85, y: 0.75 },
    { name: "São Paulo", x: 0.30, y: 0.65 },
    { name: "Cape Town", x: 0.52, y: 0.70 },
    { name: "Dubai", x: 0.60, y: 0.45 }
  ],
  connections: [
    [0, 1], [0, 5], [1, 3], [1, 6], [2, 3], [3, 4], [3, 7], [5, 6]
  ]
};

// Draw grid on canvas
export const drawGrid = (
  ctx: CanvasRenderingContext2D, 
  canvasWidth: number, 
  canvasHeight: number, 
  gridSize: number
) => {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(140, 190, 255, 0.12)";
  ctx.lineWidth = 0.5;
  
  // Draw vertical lines
  for (let x = 0; x < canvasWidth; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
  }
  
  // Draw horizontal lines
  for (let y = 0; y < canvasHeight; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
  }
  
  ctx.stroke();
};

// Draw connections between points
export const drawConnections = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  time: number,
  isMobile: boolean
) => {
  ctx.lineWidth = isMobile ? 1 : 1.5;
  
  mapData.connections.forEach(([fromIdx, toIdx]) => {
    const from = mapData.points[fromIdx];
    const to = mapData.points[toIdx];
    
    const [x1, y1] = mapToCanvas(from.x, from.y, canvasWidth, canvasHeight);
    const [x2, y2] = mapToCanvas(to.x, to.y, canvasWidth, canvasHeight);
    
    // Calculate midpoint with curve offset
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - Math.min(100, Math.abs(x2 - x1) * 0.2);
    
    // Draw curved path
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(midX, midY, x2, y2);
    ctx.strokeStyle = "rgba(120, 200, 255, 0.6)";
    ctx.stroke();
    
    // Draw animated particles along the path
    const particleCount = isMobile ? 2 : 4;
    
    for (let i = 0; i < particleCount; i++) {
      // Calculate position along the curve (using time for animation)
      const t = ((time * 0.0001) + (i / particleCount)) % 1;
      
      // Quadratic bezier formula
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      
      const px = uu * x1 + 2 * u * t * midX + tt * x2;
      const py = uu * y1 + 2 * u * t * midY + tt * y2;
      
      // Draw the particle
      ctx.beginPath();
      ctx.arc(px, py, isMobile ? 1.5 : 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180, 240, 255, 0.9)";
      ctx.fill();
    }
  });
};

// Draw points on the map
export const drawPoints = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  time: number,
  isMobile: boolean
) => {
  mapData.points.forEach((point, idx) => {
    const [x, y] = mapToCanvas(point.x, point.y, canvasWidth, canvasHeight);
    
    // Pulse effect for points
    const pulseSize = 1 + Math.sin(time * 0.002 + idx) * 0.2;
    const pointSize = isMobile ? 3 : 4;
    
    // Draw glow
    const gradient = ctx.createRadialGradient(
      x, y, pointSize * 0.5,
      x, y, pointSize * 3
    );
    gradient.addColorStop(0, "rgba(140, 230, 255, 0.8)");
    gradient.addColorStop(1, "rgba(140, 200, 255, 0)");
    
    ctx.beginPath();
    ctx.arc(x, y, pointSize * 3 * pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw point
    ctx.beginPath();
    ctx.arc(x, y, pointSize * pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220, 250, 255, 0.95)";
    ctx.fill();
  });
};
