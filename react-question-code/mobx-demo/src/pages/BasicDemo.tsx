import React, { FC, useState, useEffect } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

class Timer {
  secondsPassed = 0
  constructor() {
    makeAutoObservable(this)
  }
  increase() {
    this.secondsPassed++
  }
  reset() {
    this.secondsPassed = 0
  }
}

const myTimer = new Timer()
type PropsType = { timer: Timer }
const TimerView = observer((props: PropsType) => {
  const { timer } = props
  return <button onClick={() => timer.reset()}>
    Seconds passed: {timer.secondsPassed}
  </button>
})

const Demo: FC = () => {
  const [list, setList] = useState(["1"])
  useEffect(() => {
    const id = setInterval(() => {
      myTimer.increase()
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return <div>
    <p>Basic Demo</p>
    {list.length > 0 && <TimerView timer={myTimer} />}
  </div>
}

export default Demo