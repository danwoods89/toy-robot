import { DIRECTIONS, Orientation, Robot } from "./constants";
import utils from "./utils";

export enum ACTIONS {
  MOVE = "MOVE",
  PLACE = "PLACE",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  REPORT = "REPORT",
}

type Action =
  | { type: ACTIONS.MOVE; payload: Robot }
  | { type: ACTIONS.PLACE; payload: Robot }
  | { type: ACTIONS.LEFT; payload: Robot }
  | { type: ACTIONS.RIGHT; payload: Robot }
  | { type: ACTIONS.REPORT; payload: Robot };

export const robotReducer = (action: Action) => {
  switch (action.type) {
    case ACTIONS.MOVE: {
      switch (action.payload.orientation) {
        case Orientation.NORTH:
          if (utils.validateCommand(action.payload)) {
            return {
              ...action.payload,
              coordinates: {
                ...action.payload.coordinates,
                y: action.payload.coordinates.y + 1,
              },
            };
          } else {
            return action.payload;
          }
        case Orientation.SOUTH:
          if (utils.validateCommand(action.payload)) {
            return {
              ...action.payload,
              coordinates: {
                ...action.payload.coordinates,
                y: action.payload.coordinates.y - 1,
              },
            };
          } else {
            return action.payload;
          }
        case Orientation.EAST:
          if (utils.validateCommand(action.payload)) {
            return {
              ...action.payload,
              coordinates: {
                ...action.payload.coordinates,
                x: action.payload.coordinates.x + 1,
              },
            };
          } else {
            return action.payload;
          }
        case Orientation.WEST:
          if (utils.validateCommand(action.payload)) {
            return {
              ...action.payload,
              coordinates: {
                ...action.payload.coordinates,
                x: action.payload.coordinates.x - 1,
              },
            };
          } else {
            return action.payload;
          }
        default:
          break;
      }
      break;
    }
    case ACTIONS.PLACE: {
      if (action.payload.exists) {
        return { ...action.payload, coordinates: action.payload.coordinates };
      } else {
        return {
          coordinates: action.payload.coordinates,
          orientation: action.payload.orientation,
          exists: true,
        };
      }
    }
    case ACTIONS.LEFT: {
      return {
        ...action.payload,
        orientation:
          DIRECTIONS[(DIRECTIONS.indexOf(action.payload.orientation) + 1) % 4],
      };
    }
    case ACTIONS.RIGHT: {
      return {
        ...action.payload,
        orientation:
          DIRECTIONS[DIRECTIONS.indexOf(action.payload.orientation) - 1],
      };
    }
    case ACTIONS.REPORT: {
      return `${action.payload.coordinates.x}, ${action.payload.coordinates.y}, ${action.payload.orientation}`;
    }
    default: {
      throw new Error(`Unspecified action type.`);
    }
  }
};
