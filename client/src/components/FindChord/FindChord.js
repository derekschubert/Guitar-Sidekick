import React, { useContext, useState } from 'react';

import ControlsContext from 'contexts/Controls';
import Fretboard from '../Fretboard';
import { findNotesInSelectedScale } from '../Helpers';

// Coming Soon
const determinePossibleChords = (selectedNotes) => {
  const notes = selectedNotes.map(n => n.split('-')[2]);
  console.log(notes);
};

export default () => {
  let { controls } = useContext(ControlsContext);
  let [selectedFrets, setSelectedFrets] = useState([]);
  
  let notesInScale = findNotesInSelectedScale({ controls });
  
  const onFretClick = ({ string, position, note }) => {
    if (!notesInScale.includes(note)) return;
    
    let newSelectedFrets = [...selectedFrets];
    let fret = `${string}-${position}-${note}`;

    if (selectedFrets[0] === fret) {
      newSelectedFrets = [];
    } else if (selectedFrets.includes(fret)) {
      newSelectedFrets.splice(newSelectedFrets.indexOf(fret), 1);
    } else {
      newSelectedFrets.push(fret);
    }

    if (newSelectedFrets.length >= 2) determinePossibleChords(newSelectedFrets);
    setSelectedFrets(newSelectedFrets);
  };

  return (
    <Fretboard selectedFrets={selectedFrets}
      notesInScale={notesInScale}
      onClick={onFretClick}
      type={'FindChord'}
    />
  );
};