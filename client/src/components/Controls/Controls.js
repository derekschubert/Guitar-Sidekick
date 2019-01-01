import React, { useState, useContext } from 'react';
import ControlsContext from 'contexts/Controls';

import Select from '../Inputs/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Panel from '../Inputs/Panel';
import InputField from '../Inputs/InputField';

const helpers = {
  capitalize: (string) => {
    let s = '';
    for (let i = 0; i < string.length; i++) {
      if (i === 0) s += string[i].toUpperCase();
      else s += string[i];
    }
    return s;
  },
};

const Key = ({ controls, dispatch }) => (
  <Select label='Key'
    value={controls.key}
    onChange={(e) => dispatch({ type: 'SET_KEY', key: e.target.value })}
  >
    {controls.constants.notes.map(n => (
      <MenuItem key={n} value={n}>{n.toUpperCase()}</MenuItem>
    ))}
  </Select>
);

const Scale = ({ controls, dispatch }) => (
  <Select value={controls.scale}
    label='Scale'
    onChange={(e) => dispatch({ type: 'SET_SCALE', scale: e.target.value })}
  >
    {Object.entries(controls.constants.scales).map(([name, _]) => (
      <MenuItem key={name} value={name}>{helpers.capitalize(name)}</MenuItem>
    ))}
  </Select>
);

const Tuning = ({ controls, dispatch }) => (
  controls.tuning.map((t, i) => (
    <Select key={i} value={t}
      label={`${i + 1} String`}
      onChange={(e) => dispatch({ type: 'SET_TUNING', tuning: e.target.value, string: i })}
    >
      {controls.constants.notes.map(n => (
        <MenuItem key={n} value={n}>{n.toUpperCase()}</MenuItem>
      ))}
    </Select>
  ))
);

const Capo = ({ controls, dispatch }) => (
  <InputField type='number'
    label='Capo'
    value={controls.capo}
    onChange={(e) => dispatch({ type: 'SET_CAPO', capo: e.target.value })}
  />
);

const Strings = ({ controls, dispatch }) => (
  <InputField type='number'
    label='Strings'
    value={controls.strings}
    onChange={(e) => dispatch({ type: 'SET_STRINGS', strings: e.target.value })}
  />
);

const Frets = ({ controls, dispatch }) => (
  <InputField type='number'
    label='Frets'
    value={controls.frets}
    onChange={(e) => dispatch({ type: 'SET_FRETS', frets: e.target.value })}
  />
);

export default () => {
  const ctx = useContext(ControlsContext);
  const selectedState = useState(null);

  return (
    <div>
      <Panel title='Scale' selectedState={selectedState}>
        <Key {...ctx} />
        <Scale {...ctx} />
      </Panel>
      <Panel title='Tuning' selectedState={selectedState}>
        <Tuning {...ctx} />
        <Capo {...ctx} />
      </Panel>
      <Panel title='String and Fret Count' selectedState={selectedState}>
        <Strings {...ctx} />
        <Frets {...ctx} />
      </Panel>
    </div>
  );
};