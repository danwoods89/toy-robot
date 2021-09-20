export const BOARD_X_MAX: number = 6;
export const BOARD_Y_MAX: number = 6;

export enum Orientation {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export const DIRECTIONS = [
  Orientation.EAST,
  Orientation.NORTH,
  Orientation.WEST,
  Orientation.SOUTH,
];

export interface Coordinates {
  x: number;
  y: number;
}

export interface Robot {
  orientation: Orientation;
  coordinates: Coordinates;
  exists: Boolean;
}

export interface Board {
  xMax: number;
  yMax: number;
}

export class NoRobotDeployedError extends Error {
  constructor() {
    super();
    this.name = "NoRobotDeployedError";
    this.message = "No robot deployed!";
  }
}
