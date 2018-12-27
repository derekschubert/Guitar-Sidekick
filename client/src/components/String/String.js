import React from 'react';
import './String.css';
import Fret from '../Fret';

export const FretPositions = ({ capo, frets }) => {
  const startingFret = capo ? capo : 0;
  let positionsJSX = [];

  for (let i = 0; i < frets; i++) {
    positionsJSX.push(
      i >= startingFret ? <Fret key={i} note={i - startingFret} displayNote={true} /> : <Fret key={i} note={null} />
    );
  }

  return (
    <div className='string fret-positions'>
      {positionsJSX}
    </div>
  );
};

export default ({ controls, openNote, notesInScale, capo, forceShowAllNotes, isButton, onClick, selectedFrets }) => {
  const { frets, constants } = controls;
  let showAllNotes = forceShowAllNotes ? true : controls.showAllNotes;

  const openNoteIndex = constants.notes.findIndex(i => i === openNote);

  let fretsJSX = [];

  for (let i = 0; i < frets; i++) {
    let noteIndex = openNoteIndex + i >= 12 ? (openNoteIndex + i) % 12 : openNoteIndex + i;
    let note = constants.notes[noteIndex];

    let noteInScale;

    if (notesInScale) {
      noteInScale = notesInScale.findIndex(i => i === note);
      noteInScale < 0 ? noteInScale = null : noteInScale += 1;
    }
  
    let style = {};
    if (capo && i === capo) style.backgroundColor = 'rgba(20, 150, 194, 0.4)';
    if (i === 0) style.borderRight = '6px solid #000';

    fretsJSX.push(
      <Fret key={i} 
        note={note} 
        showAllNotes={showAllNotes} 
        displayNote={noteInScale} 
        style={style}
        isButton={isButton}
        selectedFrets={selectedFrets}
        onClick={onClick} />
    );
  }

  return (
    <div className='string'>
      {fretsJSX}
    </div>
  );
};
