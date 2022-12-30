import React, {useState} from 'react'

export default function MultiHookState() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(20);
  const [friends, setFriends] = useState(["ming", "uzi", "xiaohu", "mlxg", "letme"])
  return (
    <div>
      <h2>当前计数: {count}</h2>
      <h2>年龄: {age}</h2>
      <ul>
        {friends.map((item,index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
    </div>
  )
}
