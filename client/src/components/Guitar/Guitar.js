import React, { useState } from 'react';
import FindChord from '../FindChord';
import FindScale from '../FindScale';

export default () => {
  let [showScaleFinder, setShowScaleFinder] = useState(false);

  return (
    <div className='guitar'>
      {showScaleFinder ? <FindScale hideScaleFinder={() => setShowScaleFinder(false)} /> : <FindChord />}
      <button className='' onClick={() => setShowScaleFinder(!showScaleFinder)}>{showScaleFinder ? 'Hide Scale' : 'Find Scale'}</button>
    </div>
  );
};

