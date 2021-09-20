import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ACTIONS, PlaceAction, robotReducer } from './reducer';
import { BOARD_X_MAX, BOARD_Y_MAX, ORIENTATION } from './constants';

it('places a robot when one does not exist', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: false,
    },
    error: false,
    message: '',
  };
  const updateAction = {
    type: ACTIONS.PLACE,
    payload: {
      coordinates: { x: 0, y: 0 },
      orientation: ORIENTATION.NORTH,
    } as PlaceAction,
  };
  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    ...initialState,
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
  };
  expect(updatedState).toEqual(expectedState);
});

it('places a robot outside of the boundaries at top right', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: false,
    },
    error: false,
    message: '',
  };
  const updateAction = {
    type: ACTIONS.PLACE,
    payload: {
      coordinates: { x: BOARD_X_MAX + 1, y: BOARD_Y_MAX + 1 },
      orientation: ORIENTATION.NORTH,
    } as PlaceAction,
  };
  const updatedState = robotReducer(initialState, updateAction);

  expect(updatedState.error).toEqual(true);
});

it('places a robot outside of the boundaries at bottom left', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: false,
    },
    error: false,
    message: '',
  };
  const updateAction = {
    type: ACTIONS.PLACE,
    payload: {
      coordinates: { x: -1, y: -1 },
      orientation: ORIENTATION.NORTH,
    } as PlaceAction,
  };
  const updatedState = robotReducer(initialState, updateAction);

  expect(updatedState.error).toEqual(true);
});

it('places a robot without an orientation when one exists already', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.SOUTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };
  const updateAction = {
    type: ACTIONS.PLACE,
    payload: {
      coordinates: { x: 0, y: 0 },
    } as PlaceAction,
  };
  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    robot: {
      orientation: ORIENTATION.SOUTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  expect(updatedState).toEqual(expectedState);
});

it('places a robot without an orientation when one does not exist already', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.SOUTH,
      coordinates: { x: 0, y: 0 },
      exists: false,
    },
    error: false,
    message: '',
  };
  const updateAction = {
    type: ACTIONS.PLACE,
    payload: {
      coordinates: { x: 0, y: 0 },
    } as PlaceAction,
  };
  const updatedState = robotReducer(initialState, updateAction);

  expect(updatedState.error).toEqual(true);
});

it('moves a robot to a valid position on the y axis', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.MOVE,
  };

  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 1 },
      exists: true,
    },
    error: false,
    message: '',
  };

  expect(updatedState).toEqual(expectedState);
});

it('moves a robot to a valid position on the x axis', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.EAST,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.MOVE,
  };

  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    robot: {
      orientation: ORIENTATION.EAST,
      coordinates: { x: 1, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  expect(updatedState).toEqual(expectedState);
});

it('moves a robot to an invalid position on the y axis', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.SOUTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.MOVE,
  };

  const updatedState = robotReducer(initialState, updateAction);

  expect(updatedState.error).toEqual(true);
});

it('moves a robot to an invalid position on the x axis', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.WEST,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.MOVE,
  };

  const updatedState = robotReducer(initialState, updateAction);

  expect(updatedState.error).toEqual(true);
});

it('rotates robot right', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.RIGHT,
  };

  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    robot: {
      orientation: ORIENTATION.EAST,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  expect(updatedState).toEqual(expectedState);
});

it('rotates robot left', () => {
  const initialState = {
    robot: {
      orientation: ORIENTATION.NORTH,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  const updateAction = {
    type: ACTIONS.LEFT,
  };

  const updatedState = robotReducer(initialState, updateAction);

  const expectedState = {
    robot: {
      orientation: ORIENTATION.WEST,
      coordinates: { x: 0, y: 0 },
      exists: true,
    },
    error: false,
    message: '',
  };

  expect(updatedState).toEqual(expectedState);
});
