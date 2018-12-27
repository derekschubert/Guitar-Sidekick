import React, { useContext, } from 'react';
import { TodoContext } from './TodoContext';

const Todo = ({id, text, complete, dispatch}) => (
  <div key={id} className='todo'>
    <span className='text'
      style={complete ? { color: '#777', textDecoration: 'line-through' } : { color: '#111' }}
      onClick={() => dispatch({ type: 'DELETE_TODO', id: id })}
    >
      {text}
    </span>
  </div>
)

export default () => {
  const { todos, dispatch } = useContext(TodoContext);
  return todos.map(t => <Todo key={t.id} {...t} dispatch={dispatch} />)
}