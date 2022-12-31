import React, { useRef, useState, useEffect } from 'react'

export default function RefHookDemo02() {
  const [count, setCount] = useState(0);
  const numRef = useRef(count);

  useEffect(() => {
    numRef.current = count;
  }, [count])

  return (
    <div>
      {/* <h2>numRef值: {numRef.current}</h2>
      <h2>当前值: {count}</h2> */}
      <h2>count上一次的值: {numRef.current}</h2>
      <h2>count当前值: {count}</h2>
      <button onClick={e => setCount(count + 10)}>+10</button>
    </div>
  )
}
