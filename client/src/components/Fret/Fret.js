import React from 'react';
import './Fret.css'

export default ({ note, displayNote, style, showAllNotes, onClick, selectedFrets, string, position, type }) => {
  
  // For fret positions type
  if (typeof(note) === 'number' || note === null) {
    return (
      <div className={note === 0 ? 'fret fret-position first' : 'fret fret-position'}>
        <span className='note'>{note && note}</span>
      </div>
    );
  }

  // For all other fret types
  else {
    // Set classnames based on usage
    let classes;
    switch (type) {
      case 'FindScale':
        classes = selectedFrets.includes(note) ? 'fret fret-button fret-selected' : 'fret fret-button';
        break;
      case 'FindChord':
        let fret = `${string}-${position}-${note}`;
        classes = 'fret fret-button';

        if (selectedFrets[0] === fret) {
          classes += ' fret-selected-root';
        } else if (selectedFrets.includes(fret)) {
          classes += ' fret-selected';
        }
        
        break;
      default:
        console.error('error');
        break;
    }

    return (
      <div className={classes} 
        style={style} 
        onClick={() => onClick({ note, string, position })} 
      >
        {(displayNote || showAllNotes) && (
          <React.Fragment>
            <span className='note'>{note.toUpperCase()}</span>
            <span className='in-scale'>{displayNote}</span>
          </React.Fragment>
        )}
        {!displayNote && !showAllNotes && (
          <span className='muted'>x</span>
        )}
      </div>
    );
  }
};