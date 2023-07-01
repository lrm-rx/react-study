import React from 'react';
import BasicDemo from './pages/BasicDemo'
import TodoList from './pages/TodoList'

function App() {
  return (
    <>
      <h1>Mobx demo</h1>
      <BasicDemo />
      <hr />
      <TodoList />
    </>
  );
}

export default App;
