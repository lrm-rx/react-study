import React, { useState, useCallback, useMemo } from 'react'

export default function CallbackHookDemo01() {
  const [count, setCount] = useState(0)
  const increment1 = () => {
    console.log('执行increment1');
    setCount(count + 1)
  }
  // increment2和increment3为 useCallback和useMemo的相互转换
  const increment2 = useCallback(() => {
    console.log('执行increment2');
    setCount(count + 1)
  }, [count])

  const increment3 = useMemo(() => {
    return () => {
      console.log('执行increment2');
      setCount(count + 1)
    }
  }, [count])
  return (
    <div>
      <h2>CallbackHookDemo01: {count}</h2>
      <button onClick={increment1}>普通函数:+1</button>
      <button onClick={increment2}>useCallback: +1</button>
    </div>
  )
}
