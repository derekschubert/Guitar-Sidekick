import React, { useContext, useState } from 'react';
import './Fretboard.css';

import { ControlsContext } from '../Controls';
import String, { FretPositions } from '../String';
import { findNotesInSelectedScale } from '../Helpers';

import ChordFinder from '../FindChord/FindChord';

export default () => {
  const { controls } = useContext(ControlsContext);
  let notesInScale = findNotesInSelectedScale({ controls });

  let tuning = [...controls.tuning].reverse();

  return (
    <div className='fretboard'>
      {controls.showTopFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}

      {tuning.map((t, i) => <String key={i} notesInScale={notesInScale} openNote={t} controls={controls} capo={controls.capo} />)}

      {controls.showBottomFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}
    </div>
  );
}
