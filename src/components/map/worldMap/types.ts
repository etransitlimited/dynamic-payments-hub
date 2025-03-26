
export interface Point {
  x: number;
  y: number;
}

export interface WorldMapPoint {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface WorldMapConnection {
  points: number[];
}

export interface WorldMapContinent {
  name: string;
  points: [number, number][];
}

export interface WorldMapData {
  points: WorldMapPoint[];
  connections: number[][];
  continents: WorldMapContinent[];
}
