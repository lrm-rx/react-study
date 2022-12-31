import React, { useRef, forwardRef } from 'react'

const RMInput = forwardRef((props, ref) => {
  return <input ref={ref} type="text" />
})

export default function ForwardRefDemo() {
  const inputRef = useRef();
  return (
    <div>
      <RMInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚集</button>
    </div>
  )
}
