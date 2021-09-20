import { BOARD_X_MAX, BOARD_Y_MAX } from './constants';
import { Robot } from './types';

const utils = {
  validateCommand(robot: Robot): boolean {
    if (
      robot.coordinates?.x <= BOARD_X_MAX &&
      robot.coordinates?.y <= BOARD_Y_MAX &&
      robot.coordinates?.x >= 0 &&
      robot.coordinates?.y >= 0 &&
      robot.exists
    )
      return true;

    return false;
  },
  isNumber(value: string | number): boolean {
    return (
      value != null && value !== '' && !Number.isNaN(Number(value.toString()))
    );
  },
};

export default utils;
