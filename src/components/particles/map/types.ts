
export interface MapNode {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: [number, number, number];
  connections: number[];
  pulse: number;
}

export interface Region {
  name: string;
  x: [number, number];
  y: [number, number];
  density: number;
}

export const worldRegions: Region[] = [
  { name: "North America", x: [15, 30], y: [15, 40], density: 0.7 },
  { name: "South America", x: [25, 35], y: [50, 85], density: 0.6 },
  { name: "Europe", x: [45, 55], y: [15, 35], density: 1 },
  { name: "Africa", x: [45, 60], y: [40, 70], density: 0.7 },
  { name: "Asia", x: [60, 85], y: [15, 50], density: 0.9 },
  { name: "Australia", x: [80, 90], y: [60, 75], density: 0.5 },
  // Ocean nodes for better coverage
  { name: "Pacific", x: [5, 15], y: [30, 60], density: 0.2 },
  { name: "Atlantic", x: [35, 45], y: [25, 60], density: 0.2 },
  { name: "Indian", x: [65, 75], y: [50, 65], density: 0.2 }
];
