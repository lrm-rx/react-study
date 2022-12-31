import React, { useState, useMemo } from 'react'

function calcNum(count) {
  console.log("calcNum执行了");
  let total = 0;
  for (let i = 0; i <= count; i++) {
    total += 1
  }
  return total;
}
export default function MemoHookDemo01() {
  const [count, setCount] = useState(10)
  const [show, setShow] = useState(true)

  // const total = calcNum(count)
  const total = useMemo(() => {
    console.log("calcNum重新计算");
    return calcNum(count)
  }, [count])

  return (
    <div>
      <h2>计算数字的和: {total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}
