import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid'
import { addTodo, removeTodo, toggleCompleted } from '../store/todoList'
import type { StateType } from '../store/index'
import type { TodoItemType } from '../store/todoList'

const TodoList: FC = () => {
  // 从 redux store 中获取 todoList
  const todoList = useSelector<StateType>(state => state.todoList) as TodoItemType[]

  const dispatch = useDispatch()

  function add() {
    const id = nanoid(5)
    const newTodo = {
      id,
      title: `todo-${id}`,
      completed: false
    }

    dispatch(addTodo(newTodo))
  }

  function del(id: string) {
    dispatch(removeTodo({ id }))
  }

  function toggle(id: string) {
    dispatch(toggleCompleted({ id }))
  }

  return <>
    <p>TodoList demo</p>
    <div>
      <button onClick={add}>添加 todo</button>
    </div>
    <ul>
      {todoList.map(todo => {
        const { id, title, completed } = todo
        return <li
          key={id}
          style={{ textDecoration: completed ? 'line-through' : '' }}>
          <span onClick={() => toggle(id)}>{title}</span>
          &nbsp;
          <button onClick={() => del(id)}>删除</button>
        </li>
      })}
    </ul>
  </>
}

export default TodoList