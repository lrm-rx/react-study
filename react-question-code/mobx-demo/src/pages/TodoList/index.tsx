import React, { FC } from 'react'
import TodoList from './TodoList'
import store from './store'

const Demo: FC = () => {
  return <>
    <p>TodoList by Mobx</p>
    <TodoList store={store} />
  </>
}

export default Demo