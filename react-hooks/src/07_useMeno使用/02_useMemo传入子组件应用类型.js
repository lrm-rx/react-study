import React, { useState, useMemo, memo } from 'react'

const RMInfo = memo((props) => {
  console.log("RMIfno重新渲染");
  return <h2>名字: {props.info.name} 年龄: {props.info.age}</h2>
})
export default function MemoHookDemo02() {
  console.log("MemoHookDemo02重新渲染");
  const [show, setShow] = useState(true)
  // const info = { name: "xiaoming", age: 10 }
  const info = useMemo(() => {
    return { name: "xiaoming", age: 10 }
  }, [])

  return (
    <div>
      <RMInfo info={info} />
      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}
