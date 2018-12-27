import React from 'react';
import Controls, { ControlsProvider } from './components/Controls';
import GuitarHelper from './components/Guitar';
import Menu from './components/Menu';
export default () => {
  // let [state, dispatch] = useReducer(appReducer);

  return (
    <ControlsProvider>
        <div className="App">
          <Menu active={'Guitar Helper'} />
          <GuitarHelper />
          <Controls />
        </div>
    </ControlsProvider>
  );
};