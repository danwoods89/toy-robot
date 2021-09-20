import { BOARD_X_MAX, BOARD_Y_MAX, Robot } from "./types";

const utils = {
  validateCommand(robot: Robot): Boolean {
    if (
      robot.coordinates!.x <= BOARD_X_MAX &&
      robot.coordinates!.y <= BOARD_Y_MAX &&
      robot.coordinates!.x >= 0 &&
      robot.coordinates!.y >= 0
    )
      return true;

    return false;
  },
};

export default utils;
