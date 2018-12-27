import React, { createContext, useReducer } from 'react';
import Controls from './ControlsContent';
import { generateScales } from '../Helpers';

export const ControlsContext = createContext({});

let constants = {
  notes: ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'],
  scales: {
    'major': {
      name: 'major',
      abr: 'maj',
      pattern: [2, 2, 1, 2, 2, 2, 1],
      notes: [0, 2, 4, 5, 7, 9, 11],
    },
    'minor': {
      name: 'minor',
      abr: 'min',
      pattern: [2, 1, 2, 2, 1, 2, 2],
      notes: [0, 2, 3, 5, 7, 8, 10],
    },
  },
};

constants['allScales'] = generateScales({ constants });

const initialControls = {
  constants,
  key: 'b',
  scale: 'minor',
  frets: 15,
  strings: 6,
  capo: 0,
  tuning: ['e', 'a', 'd', 'g', 'b', 'e'],
  // tuning: ['d', 'a', 'e', 'a', 'c#', 'e'],
  selectedPanel: null,
  showAllNotes: false,
  showTopFretPositions: false,
  showBottomFretPositions: true,
};

const controlsReducer = (controls, action) => {
  const actions = {
    'SET_KEY': () => ({ ...controls, key: action.key }),
    'SET_SCALE': () => ({ ...controls, scale: action.scale }),
    'SET_KEY_AND_SCALE': () => ({ ...controls, key: action.key, scale: action.scale }),
    'SET_FRETS': () => {
      const frets = Math.floor(action.frets);
      if (0 <= frets && frets < 30) return { ...controls, frets };
      else return { ...controls };
    },
    'SET_STRINGS': () => {
      const strings = Math.floor(action.strings);

      if (0 < strings && strings < 13) {
        const dif = Math.abs(strings - controls.strings);
        let tuning = [...controls.tuning];

        for (let i = 0; i < dif; i++) {
          if (strings > controls.strings) tuning.push('c');
          else tuning.pop();
        }

        return { ...controls, strings, tuning };
      }
      else return { ...controls };
    },
    'SET_CAPO': () => {
      const capo = Math.floor(action.capo);
      if (0 <= capo && capo <= controls.frets) return { ...controls, capo };
      else return { ...controls };
    },
    'SET_SELECTED_PANEL': () => ({ ...controls, selectedPanel: action.selectedPanel }),
    'SET_TUNING': () => {
      const tuning = [ ...controls.tuning ];
      tuning[action.string] = action.tuning;

      return { ...controls, tuning };
    },
    'default': () => controls,
    'error': () => console.err('Error in Controls Reducer'),
  };

  return (actions[action.type] || actions['error'])();
};

export const ControlsProvider = ({ children }) => {
  const [controls, dispatch] = useReducer(controlsReducer, initialControls);

  return (
    <ControlsContext.Provider value={{ controls, dispatch }}>
      {children}
    </ControlsContext.Provider>
  );
};

export default () => {
  return <Controls />;
};