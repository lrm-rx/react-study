import React, { FC, useMemo, useState } from 'react'

const Demo: FC = () => {
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('hello')

  const sum = useMemo(() => {
    return num1 + num2
  }, [num1, num2])

  return (
    <>
      <p>useMemo</p>
      <p>{sum}</p>
      <div>
        {num1} -- <button onClick={() => setNum1(num1 + 1)}>add num1</button>
      </div>
      <div>
        {num2} -- <button onClick={() => setNum2(num2 + 2)}>add num2</button>
      </div>
      <div>
        <input onChange={e => setText(e.target.value)} value={text} />
      </div>
    </>
  )
}

export default Demo
