import { DIRECTIONS, ORIENTATION } from './constants';
import { Coordinates, Robot } from './types';
import utils from './utils';

export enum ACTIONS {
  MOVE = 'MOVE',
  PLACE = 'PLACE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  REPORT = 'REPORT',
  RESET = 'RESET',
}

export interface PlaceAction {
  coordinates: Coordinates;
  orientation: ORIENTATION | null;
}

type Action =
  | { type: ACTIONS.MOVE }
  | { type: ACTIONS.PLACE; payload: PlaceAction }
  | { type: ACTIONS.LEFT }
  | { type: ACTIONS.RIGHT }
  | { type: ACTIONS.REPORT }
  | { type: ACTIONS.RESET };

export const initialState: State = {
  robot: {
    orientation: ORIENTATION.NORTH,
    coordinates: { x: 0, y: 0 },
    exists: false,
  },
  error: false,
  message: '',
};

interface State {
  robot: Robot;
  error: boolean;
  message: string;
}

export const robotReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.MOVE: {
      switch (state.robot.orientation) {
        case ORIENTATION.NORTH: {
          const coordinates: Coordinates = {
            ...state.robot.coordinates,
            y: state.robot.coordinates.y + 1,
          };
          const newRobot: Robot = { ...state.robot, coordinates };
          if (utils.validateCommand(newRobot)) {
            return { robot: newRobot, error: false, message: '' };
          }
          return {
            ...state,
            error: true,
            message: 'Invalid move - outside y axis boundary.',
          };
        }
        case ORIENTATION.SOUTH: {
          const coordinates: Coordinates = {
            ...state.robot.coordinates,
            y: state.robot.coordinates.y - 1,
          };
          const newRobot: Robot = { ...state.robot, coordinates };
          if (utils.validateCommand(newRobot)) {
            return { robot: newRobot, error: false, message: '' };
          }
          return {
            ...state,
            error: true,
            message: 'Invalid move - outside y axis boundary.',
          };
        }
        case ORIENTATION.EAST: {
          const coordinates: Coordinates = {
            ...state.robot.coordinates,
            x: state.robot.coordinates.x + 1,
          };
          const newRobot: Robot = { ...state.robot, coordinates };
          if (utils.validateCommand(newRobot)) {
            return { robot: newRobot, error: false, message: '' };
          }
          return {
            ...state,
            error: true,
            message: 'Invalid move - outside x axis boundary.',
          };
        }
        case ORIENTATION.WEST: {
          const coordinates: Coordinates = {
            ...state.robot.coordinates,
            x: state.robot.coordinates.x - 1,
          };
          const newRobot: Robot = { ...state.robot, coordinates };
          if (utils.validateCommand(newRobot)) {
            return { robot: newRobot, error: false, message: '' };
          }
          return {
            ...state,
            error: true,
            message: 'Invalid move - outside x axis boundary.',
          };
        }
        default:
          throw new Error('Invalid direction.');
      }
    }
    case ACTIONS.PLACE: {
      if (state.robot.exists) {
        const newRobot: Robot = {
          ...state.robot,
          coordinates: action.payload.coordinates,
        };
        if (utils.validateCommand(newRobot)) {
          return {
            robot: newRobot,
            error: false,
            message: '',
          };
        }
        return {
          ...state,
          error: true,
          message:
            'Invalid robot placement. Robot must be placed within the boundaries.',
        };
      }
      if (action.payload.orientation) {
        const newRobot: Robot = {
          ...state.robot,
          coordinates: action.payload.coordinates,
          orientation: action.payload.orientation,
          exists: true,
        };

        if (utils.validateCommand(newRobot)) {
          return {
            robot: newRobot,
            error: false,
            message: '',
          };
        }
        return {
          ...state,
          error: true,
          message:
            'Invalid robot placement. Robot must be placed within the boundaries.',
        };
      }
      return {
        ...state,
        error: true,
        message: 'An orientation must be provided for first placements.',
      };
    }
    case ACTIONS.LEFT: {
      return {
        ...state,
        robot: {
          ...state.robot,
          orientation:
            DIRECTIONS[
              (DIRECTIONS.indexOf(state.robot.orientation) + 1) %
                DIRECTIONS.length
            ],
        },
      };
    }
    case ACTIONS.RIGHT: {
      return {
        ...state,
        robot: {
          ...state.robot,
          orientation:
            DIRECTIONS[
              (DIRECTIONS.indexOf(state.robot.orientation) +
                DIRECTIONS.length -
                1) %
                DIRECTIONS.length
            ],
        },
      };
    }
    case ACTIONS.REPORT: {
      return state;
    }
    case ACTIONS.RESET: {
      return {
        ...state,
        error: false,
        message: '',
      };
    }
    default: {
      throw new Error(`Unspecified action type.`);
    }
  }
};
