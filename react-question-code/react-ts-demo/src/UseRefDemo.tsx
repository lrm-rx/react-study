import React, { FC, useRef } from 'react'
/**
 * 一般用于操作DOM
 * 也可传入普通js变量, 但更新不会触发rerender
 */
// const Demo: FC = () => {
//   const inputRef = useRef<HTMLInputElement>(null)

//   function selectInput() {
//     const inputEle = inputRef.current
//     // DOM操作
//     if (inputEle) inputEle.select()
//   }

//   return (
//     <>
//       <input ref={inputRef} defaultValue="hello world" />
//       <button onClick={selectInput}>选中input</button>
//     </>
//   )
// }

const Demo: FC = () => {
  const nameRef = useRef('小明') // 普通js变量

  function changeName() {
    nameRef.current = '小虎'
    console.log(nameRef.current)
  }
  return (
    <>
      <p>name {nameRef.current}</p>
      <div>
        <button onClick={changeName}>change name</button>
      </div>
    </>
  )
}

export default Demo
