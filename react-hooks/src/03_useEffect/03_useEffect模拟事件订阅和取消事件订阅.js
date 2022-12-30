import React, {useEffect, useState} from 'react'

export default function EffectHookCancelDemo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log("订阅事件");
  
    return () => {
      console.log("取消事件订阅");
    }
  }, [])
  
  return (
    <div>
      <h2>EffectHookCancelDemo</h2>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}
