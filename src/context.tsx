import React, { useState } from "react";
import { createContext, useContext } from "react";
import { Board, Orientation, Robot } from "./types";

type ToyRobotContextType = {
  robot: Robot;
  board: Board;
  setRobot: (value: Robot) => void;
  setBoard: (value: Board) => void;
};

export const ToyRobotContext = createContext<ToyRobotContextType | null>(null);

interface ToyRobotContextProviderProps {
  children: React.ReactNode;
}

export const ToyRobotContextProvider: React.FC<ToyRobotContextProviderProps> =
  ({ children }) => {
    const [robot, setRobot] = useState<Robot>({
      orientation: Orientation.NORTH,
      coordinates: { x: 0, y: 0 },
    });
    const [board, setBoard] = useState<Board>({ xMax: 6, yMax: 6 });

    return (
      <ToyRobotContext.Provider
        value={{
          robot,
          setRobot,
          board,
          setBoard,
        }}
      >
        {children}
      </ToyRobotContext.Provider>
    );
  };

export const useToyRobotContext = () => useContext(ToyRobotContext);