import React, { PureComponent } from 'react'

export default class CountCalss extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    const {count} = this.state;
    return (
      <div>
        <h2>class组件--当前计数: {count}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.decrement()}>-1</button>
      </div>
    )
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement() {
    this.setState({
      count: this.state.count - 1
    })
  }
}
