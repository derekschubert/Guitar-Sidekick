import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext('light');

export default ({children}) => {
  let ThemeCtx = useContext(ThemeContext);
  let [ value, setValue ] = useState('light');

  return (
    <ThemeCtx.Provider value={value}>
      {children}
    </ThemeCtx.Provider>
  );
};