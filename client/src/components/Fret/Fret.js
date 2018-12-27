import React from 'react';
import './Fret.css'

export default ({ note, displayNote, style, showAllNotes, isButton, onClick, selectedFrets, }) => {
  
  if (typeof(note) === 'number' || note === null) {
    return (
      <div className={note === 0 ? 'fret fret-position first' : 'fret fret-position'}>
        <span className='note'>{note && note}</span>
      </div>
    );
  } 
  
  else if (isButton) {
    const classes = selectedFrets.includes(note) ? 'fret fret-button fret-selected' : 'fret fret-button';

    return (
      <div className={classes} style={style} onClick={() => onClick({ note })}>
        <span className='note'>{note.toUpperCase()}</span>
      </div>
    );
  }

  else if (showAllNotes) {
    return (
      <div className='fret' style={style}>
        <span className='note'>{note.toUpperCase()}</span>
      </div>
    );
  }

  else return (
    <div className='fret' style={style}>
      {displayNote && (
        <React.Fragment>
          <span className='note'>{note.toUpperCase()}</span>
          <span className='in-scale'>{displayNote}</span>
        </React.Fragment>
      )}
      {!displayNote && (
        <span className='muted'>x</span>
      )}
    </div>
  );
};