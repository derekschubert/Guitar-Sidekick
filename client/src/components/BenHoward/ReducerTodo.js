import React, { useState, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import Todos from './Todos';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 100000),
          complete: false,
          text: action.text,
        },
      ];
    }

    case 'DELETE_TODO': {
      return state.filter(t => t.id !== action.id);
    }

    case 'TOGGLE_TODO': {
      return state.map(t => {
        if (t.id === action.id) t.complete = !t.complete;
        return t
      });
    }

    case 'RESET': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default () => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  const AddTodoForm = () => {
    const [value, setValue] = useState('');

    return (
      <form className='reducer-form' onSubmit={(e) => {
        e.preventDefault();
        if (value.length) dispatch({ type: 'ADD_TODO', text: value });
      }}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type='submit' style={value.length ? { color: '#111' } : { color: '#777' }}>Add</button>
      </form>
    );
  };

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <AddTodoForm />
      <Todos />
    </TodoContext.Provider>
  );
};