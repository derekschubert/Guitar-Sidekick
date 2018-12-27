import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default ({ type, value, onChange, label }) => {
  let labelId = label.replace(' ', '-');

  return (
    <FormControl>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Input id={labelId} value={value} onChange={onChange} type={type} />
    </FormControl>
  );
};