import React, { useState, useReducer } from 'react'
import reducer from './reducer'

export default function Profile() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <h2>Profile--当前计算: {state.count}</h2>
      <button onClick={e => dispatch({ type: "increment" })}>+1</button>
      <button onClick={e => dispatch({ type: "decrement" })}>-1</button>
    </div>
  )
}
