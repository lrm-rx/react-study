import React, { useState, useEffect } from 'react'

export default function CountHook() {
  /**
   * Hook: useState()
   *  > 这是一个函数,来自react包
   *  > 参数和返回值
   *    1.参数: 作用是给创建出来的状态一个默认值
   *    2.返回值: 数组
   *      - 元素1: 当前state的值
   *      - 元素2: 设置新的值时,使用的一个函数
   */
  const [count, setCount] = useState(0)

  function handleBtnClick() {
    // setCount(count + 10);
    // setCount(count + 10);
    // setCount(count + 10);
    // setCount(count + 10);
    setCount(preCount => preCount + 10);
    setCount(preCount => preCount + 10);
    setCount(preCount => preCount + 10);
    setCount(preCount => preCount + 10);
  }

  return (
    <div>
      <h2>hook组件--当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(preCount => preCount + 10)}>+10</button>
      <button onClick={handleBtnClick}>+10</button>
      <button onClick={e => setCount(count - 1)}>-1</button>
    </div>
  )
}


