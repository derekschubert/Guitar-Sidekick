import React, { useContext, useState } from 'react';

import ControlsContext from 'contexts/Controls';
import Fretboard from '../Fretboard';
import { arrayFullyIncludes } from '../Helpers';

const determinePossibleScales = ({ selectedFrets, allScales }) => {
  let possibleScales = {};

  Object.entries(allScales).forEach(([key, scale]) => {
    if (arrayFullyIncludes({ source: scale.notes, includes: selectedFrets })) {
      possibleScales[key] = {...scale};
    }
  });

  return possibleScales;
};

const ScaleResults = ({ possibleScales, selectedFrets, hideScaleFinder }) => {
  let { dispatch } = useContext(ControlsContext);

  const onClick = ({ root, scale }) => {
    hideScaleFinder();
    dispatch({ type: 'SET_KEY_AND_SCALE', key: root, scale });
  };

  return (
    <table className='scale-results'>
      <tbody>
        <tr>
          <td>Selected Frets:</td>
          {selectedFrets.map((sf, i) => <td key={i}>{sf}</td>)}
        </tr>
          {Object.entries(possibleScales).map(([key, possibleScale]) => (
            <tr key={key}>
              <td>{key}</td>
              {possibleScale.notes.map((s, i) => <td key={i}>{s}</td>)}
              <td>
                <button onClick={() => onClick(possibleScale)}>Use Scale</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ({ hideScaleFinder }) => {
  let { controls } = useContext(ControlsContext);
  let [selectedFrets, setSelectedFrets] = useState([]);
  let [possibleScales, setPossibleScales] = useState(controls.constants.allScales);
  
  let tuning = [...controls.tuning].reverse();

  const onFretClick = ({ note }) => {
    if (selectedFrets.includes(note)) {
      let newSelectedFrets = [...selectedFrets];
      newSelectedFrets.splice(newSelectedFrets.indexOf(note), 1);

      let newPossibleScales = determinePossibleScales({ 
        selectedFrets: newSelectedFrets,
        allScales: controls.constants.allScales,
      });

      setPossibleScales(newPossibleScales);
      setSelectedFrets(newSelectedFrets);
    } else {
      let newSelectedFrets = [...selectedFrets, note];
      let newPossibleScales = determinePossibleScales({ 
        selectedFrets: newSelectedFrets,
        allScales: controls.constants.allScales,
      });

      setPossibleScales(newPossibleScales);
      setSelectedFrets(newSelectedFrets);
    }
  };

  return (
    <div className='find-scale'>
      <Fretboard selectedFrets={selectedFrets} 
        notesInScale={null}
        onClick={onFretClick} 
        forceShowAllNotes={true}
        type={'FindScale'}
      />
      <ScaleResults hideScaleFinder={hideScaleFinder} possibleScales={possibleScales} selectedFrets={selectedFrets} />
    </div>
  );
};