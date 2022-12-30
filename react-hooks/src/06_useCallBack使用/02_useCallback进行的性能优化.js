import React, { useState, useCallback, memo } from 'react'
/**
 * useCallback在什么时候使用
 * 场景: 在将一个组件中的函数, 传递给子元素进行回调使用时,使用useCallback对函数进行处理.
 */
const RMButton = memo((props) => {
  console.log("RMButton重渲染:" + props.title);
  return <button onClick={props.increment}>优化: +1</button>
})
export default function CallbackHookDemo02() {
  console.log("CallbackHookDemo02重渲染");
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  const increment1 = () => {
    console.log('执行increment1');
    setCount(count + 1)
  }
  const increment2 = useCallback(() => {
    console.log('执行increment2');
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <h2>CallbackHookDemo02: {count}</h2>
      {/* <button onClick={increment1}>普通函数:+1</button>
      <button onClick={increment2}>useCallback: +1</button> */}
      <RMButton title="btn1" increment={increment1} />
      <RMButton title="btn2" increment={increment2} />

      <button onClick={e => setShow(!show)}>切换</button>
    </div>
  )
}
