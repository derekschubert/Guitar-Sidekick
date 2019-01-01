import React from 'react';
import Controls from 'components/Controls';
import { ControlsProvider } from 'contexts/Controls';
import GuitarHelper from 'components/Guitar';
import Menu from 'components/Menu';

export default () => {
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