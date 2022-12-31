import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const RMInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("useImperativeHandle中回调函数返回对象的focus");
      inputRef.current.focus();
    }
  }), [inputRef.current])
  return <input ref={inputRef} type="text" />
})

export default function ImperativeHandleDemo() {
  const inputRef = useRef();
  return (
    <div>
      <RMInput ref={inputRef}/>
      <button onClick={e => inputRef.current.focus()}>聚集</button>
    </div>
  )
}
