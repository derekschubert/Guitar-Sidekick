import React from 'react';

// Select Inputs
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default ({ children, value, label, onChange }) => {
  let labelId = label.replace(' ', '-');
  
  return (
    <FormControl>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Select value={value}
        onChange={onChange}
        inputProps={{ name: labelId, id: labelId}}
      >
        {children}
      </Select>
    </FormControl>
  );
};