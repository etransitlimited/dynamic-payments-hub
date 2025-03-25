
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
