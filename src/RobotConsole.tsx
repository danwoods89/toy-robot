import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { ORIENTATION } from './constants';
import { ACTIONS, initialState, robotReducer } from './reducer';

const Container = styled.div`
  background-color: rgba(66, 66, 66, 0.7);
  width: 100%;
  max-width: 400px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ConsoleTextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 10em;
  background-color: rgba(75, 75, 90, 0.7);
  resize: none;
  margin-bottom: 1em;
  border-radius: 10px;
  padding: 15px 15px;
  outline: none;
  border: none;
  color: white;
`;

const ConsoleTextInput = styled.input`
  display: block;
  width: 100%;
  background-color: rgba(75, 75, 90, 0.7);
  color: white;
  border-radius: 10px;
  padding: 0 15px;
  height: 30px;
  outline: none;
  border: none;
`;

const RobotConsole: React.FC = () => {
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
    <Container>
      <ConsoleTextArea
        value={consoleOutput.join('\n')}
        readOnly
        ref={consoleRef}
      />
      <ConsoleTextInput
        type="text"
        value={consoleInput || ''}
        onChange={handleConsoleInputChange}
        onKeyDown={handleConsoleInputKeyDown}
        placeholder="Input a command and press enter"
      />
    </Container>
  );
};

export default RobotConsole;
