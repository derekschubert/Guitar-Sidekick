import React, { useState } from 'react';
import Form from './Form';
import ReducerTodo from './ReducerTodo';

export default () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  
  const toggleComplete = (index) => {
    setTodos(
      todos.map(
        (t, i) => index === i ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div className='counter'>
      <span>count: {count}</span>
      <button onClick={() => setCount(count + 1)}>+ 1</button>
      <Form onSubmit={text => setTodos([{ text, complete: false }, ...todos])} />
      {
        todos.map(({ text, complete }, i) => (
          <div key={text} className='todo'>
            <span onClick={() => toggleComplete(i)} 
              style={complete ? {color: '#777', textDecoration: 'line-through'} : {color: '#111'}}
            >
              {text}
            </span>
          </div>
        ))
      }
      <ReducerTodo />
    </div>
  );
};