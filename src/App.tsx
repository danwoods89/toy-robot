import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Board,
  BOARD_X_MAX,
  BOARD_Y_MAX,
  Coordinates,
  DIRECTIONS,
  NoRobotDeployedError,
  Orientation,
  Robot,
} from "./types";
import { useRobot } from "./hooks";

const App: React.FC = () => {
  const [robot, issueCommand] = useRobot();

  const handleMoveCommand = () => {
    if (robot) {
      switch (robot.orientation) {
        case Orientation.NORTH:
          issueCommand({
            ...robot,
            coordinates: { ...robot.coordinates, y: robot.coordinates.y + 1 },
          });
          break;
        case Orientation.SOUTH:
          issueCommand({
            ...robot,
            coordinates: { ...robot.coordinates, y: robot.coordinates.y - 1 },
          });
          break;
        case Orientation.EAST:
          issueCommand({
            ...robot,
            coordinates: { ...robot.coordinates, x: robot.coordinates.x + 1 },
          });
          break;
        case Orientation.WEST:
          issueCommand({
            ...robot,
            coordinates: { ...robot.coordinates, x: robot.coordinates.x - 1 },
          });
          break;
        default:
          break;
      }
    } else {
      throw new NoRobotDeployedError();
    }
  };

  const handlePlaceCommand = (
    coordinates: Coordinates,
    orientation: Orientation
  ) => {
    if (robot) {
      issueCommand({ ...robot, coordinates });
    } else {
        issueCommand({ coordinates, orientation });
    }
  };

  const handleLeftCommand = () => {
    if (robot) {
      issueCommand({
        ...robot,
        orientation:
          DIRECTIONS[(DIRECTIONS.indexOf(robot.orientation) + 1) % 4],
      });
    } else {
      throw new NoRobotDeployedError();
    }
  };

  const handleRightCommand = (e: any, newValue: any) => {
    if (robot) {
      issueCommand({
        ...robot,
        orientation: DIRECTIONS[DIRECTIONS.indexOf(robot.orientation) - 1],
      });
    } else {
      throw new NoRobotDeployedError();
    }
  };

  const handleReportCommand = () => {
    if (robot) {
      return `${robot.coordinates.x}, ${robot.coordinates.y}, ${robot.orientation}`;
    }

    throw new NoRobotDeployedError();
  };

  return (
    <div className="App">
      <button onClick={handlePlaceCommand({ x: 0, y: 0 }, Orientation.NORTH)} />
    </div>
  );
};

export default App;
