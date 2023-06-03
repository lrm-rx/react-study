import React, { FC, useCallback, useState } from 'react'

const Demo: FC = () => {
  const [text, setText] = useState('hello')
  const fn1 = () => console.log('fn1 text:', text)
  const fn2 = useCallback(() => {
    console.log('fn2 text:', text)
  }, [text])

  return (
    <>
      <div>
        <button onClick={fn1}>fn1</button>&nbsp;<button onClick={fn2}>fn2</button>
      </div>
      <p>useCallback</p>
      <input onChange={e => setText(e.target.value)} value={text} />
    </>
  )
}

export default Demo
