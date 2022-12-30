import React, { useContext } from 'react'
import {UserContext, ThemeContext} from '../App'

export default function UseContextHook() {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)
  console.log(user, theme);
  return (
    <div>
      <h2 style={{color: theme.color}}>ThemeContext</h2>
      <h2>name: {user.name}</h2>
      <h2>age: {user.age}</h2>
    </div>
  )
}
