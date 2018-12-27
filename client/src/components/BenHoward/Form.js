import React, { useState } from 'react';

const useInputValue = (type, init) => {
  const [value, setValue] = useState(init);

  return {
    value,
    type,
    onChange: (e) => setValue(e.target.value),
    reset: () => setValue(''),
  };
};

export default ({ onSubmit }) => {
  const { reset, ...text } = useInputValue('text', '');

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit(text.value);
      reset();
    }}>
      <input {...text} />
    </form>
  );
};