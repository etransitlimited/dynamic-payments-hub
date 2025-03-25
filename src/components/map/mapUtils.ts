
/**
 * Maps canvas coordinates to geographic coordinates
 */
export const canvasToMapCoord = (
  x: number, 
  y: number, 
  canvasWidth: number, 
  canvasHeight: number
): [number, number] => {
  const lng = (x / canvasWidth) * 360 - 180;
  const lat = 90 - (y / canvasHeight) * 180;
  return [lat, lng];
};

/**
 * Maps geographic coordinates to canvas position
 */
export const mapCoordToCanvas = (
  lat: number, 
  lng: number,
  canvasWidth: number,
  canvasHeight: number
): [number, number] => {
  const x = ((lng + 180) / 360) * canvasWidth;
  const y = ((90 - lat) / 180) * canvasHeight;
  return [x, y];
};

/**
 * Calculate distance between two geographic coordinates
 */
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const latDiff = lat1 - lat2;
  const lngDiff = lng1 - lng2;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
};

/**
 * Calculates a point along a quadratic bezier curve
 */
export const getQuadraticBezierPoint = (
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number]
): [number, number] => {
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  
  const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
  const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
  
  return [x, y];
};
