import React, { useContext, useState } from 'react';

import { ControlsContext } from '../Controls/Controls';
import String, { FretPositions } from '../String/String';
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

  const onFretClick = () => {
    console.log('Clicked');
  };

  return (
    <div className='find-scale'>
      <div className='fretboard'>
        {controls.showTopFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}

        {tuning.map((t, i) => <String key={i} selectedFrets={selectedFrets} openNote={t} isButton={true} onClick={onFretClick} notesInScale={null} forceShowAllNotes={true} controls={controls} capo={controls.capo} />)}

        {controls.showBottomFretPositions && <FretPositions capo={controls.capo} frets={controls.frets} />}
      </div>
      <ScaleResults hideScaleFinder={hideScaleFinder} possibleScales={possibleScales} selectedFrets={selectedFrets} />
    </div>
  );
};