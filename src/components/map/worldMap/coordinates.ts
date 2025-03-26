
import { Point } from "./types";

// Convert longitude/latitude to x/y coordinates
export const geoToCanvas = (
  lon: number, 
  lat: number, 
  width: number, 
  height: number
): Point => {
  const x = (lon + 180) * (width / 360);
  const y = (90 - lat) * (height / 180);
  return { x, y };
};
