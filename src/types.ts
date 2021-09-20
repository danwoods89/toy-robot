import { ORIENTATION } from './constants';

export interface Coordinates {
  x: number;
  y: number;
}

export interface Robot {
  orientation: ORIENTATION;
  coordinates: Coordinates;
  exists: boolean;
}

export interface Board {
  xMax: number;
  yMax: number;
}
