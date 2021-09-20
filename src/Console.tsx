import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ORIENTATION } from './constants';
import { ACTIONS, initialState, robotReducer } from './reducer';

const Console: React.FC = () => {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState<string>();
  const [robotState, dispatch] = useReducer(robotReducer, initialState);
  const consoleRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (consoleRef && consoleRef.current)
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  };

  const addToConsole = useCallback(
    (input: string) => {
      const newOutput = [...consoleOutput];
      newOutput.push(input);
      setConsoleOutput(newOutput);
      setConsoleInput('');
    },
    [consoleOutput]
  );

  useEffect(() => {
    scrollToBottom();
  }, [consoleOutput]);

  useEffect(() => {
    if (robotState.error) {
      addToConsole(robotState.message);
    }
    return () => {
      dispatch({ type: ACTIONS.RESET });
    };
  }, [addToConsole, robotState.error, robotState.message]);

  const parseCommand = (input: string) => {
    const command = input.trim().split(/(\s+)/);
    try {
      switch (command[0]) {
        case ACTIONS.PLACE: {
          // PLACE 1,2,EAST or PLACE 1,2 (if robot exists)
          if (input.match(/PLACE \d,\d,NORTH|SOUTH|EAST|WEST/)) {
            const details = command[2].split(',');
            const x = parseFloat(details[0]);
            const y = parseFloat(details[1]);
            const orientation = details[2];
            dispatch({
              type: ACTIONS.PLACE,
              payload: {
                coordinates: { x, y },
                orientation: orientation as ORIENTATION,
              },
            });
          } else if (input.match(/PLACE \d,\d/) && robotState.robot.exists) {
            const details = command[2].split(',');
            const x = parseFloat(details[0]);
            const y = parseFloat(details[1]);
            dispatch({
              type: ACTIONS.PLACE,
              payload: { coordinates: { x, y }, orientation: null },
            });
          } else {
            throw Error('PLACE commmand format incorrect.');
          }
          break;
        }
        case ACTIONS.MOVE: {
          dispatch({ type: ACTIONS.MOVE });
          break;
        }
        case ACTIONS.LEFT: {
          dispatch({ type: ACTIONS.LEFT });
          break;
        }
        case ACTIONS.RIGHT: {
          dispatch({ type: ACTIONS.RIGHT });
          break;
        }
        case ACTIONS.REPORT: {
          dispatch({ type: ACTIONS.REPORT });
          if (robotState.robot.exists)
            addToConsole(
              `REPORT: ${robotState.robot.coordinates.x},${robotState.robot.coordinates.y},${robotState.robot.orientation}`
            );
          else addToConsole('No robot deployed!');
          break;
        }
        default:
          addToConsole('Invalid command.');
          break;
      }
    } catch (error) {
      addToConsole(error as string);
    }
  };

  const handleConsoleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConsoleInput(e.currentTarget.value);
  };

  const handleConsoleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (consoleInput) {
        addToConsole(consoleInput);
        parseCommand(consoleInput);
      }
    }
  };

  return (
    <>
      <textarea value={consoleOutput.join('\n')} readOnly ref={consoleRef} />
      <input
        type="text"
        value={consoleInput || ''}
        onChange={handleConsoleInputChange}
        onKeyDown={handleConsoleInputKeyDown}
      />
    </>
  );
};

export default Console;
