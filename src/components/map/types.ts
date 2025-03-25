
import { PlatformType } from "./PlatformLogo";

export interface RegionData {
  id: string;
  name: string;
  coordinates: [number, number];
  merchants: PlatformType[];
}

export interface Dimensions {
  width: number;
  height: number;
}
