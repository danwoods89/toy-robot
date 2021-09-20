import { useState } from "react";
import { Robot } from "./types";
import utils from "./utils";

export const useRobot = () => {
  const [robot, setRobot] = useState<Robot>();

  const issueCommand = (newRobot: Robot) => {
    if (utils.validateCommand(newRobot)) setRobot(newRobot);
  };

  return [robot, issueCommand] as const;
};
