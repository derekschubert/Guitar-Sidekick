import React, { useContext, useState } from 'react';
import './Fretboard.css';

import { ControlsContext } from '../Controls';
import String, { FretPositions } from '../String';
import { findNotesInSelectedScale } from '../Helpers';

export default ({ selectedFrets, notesInScale, onClick, forceShowAllNotes, type, }) => {
  const { controls } = useContext(ControlsContext);
  let tuning = [...controls.tuning].reverse();

  return (
    <div className='fretboard'>
      {controls.showTopFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}

      {tuning.map((t, i) => <String key={i}
        string={i}
        selectedFrets={selectedFrets}
        notesInScale={notesInScale}
        openNote={t}
        type={type}
        onClick={onClick}
        forceShowAllNotes={forceShowAllNotes}
        controls={controls}
        capo={controls.capo} />)}

      {controls.showBottomFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}
    </div>
  );
}

