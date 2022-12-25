import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={e => this.add()}>+1</button>
      </div>
    )
  }
  add() {
    this.setState({
      count: this.state.count + 1
    })
  }
}
/**
 * setState的同步与异步
 * 分为两种情况:
 *    1. 在组件生命周期或React合成事件中, setState是异步的
 *    2. 在setTimeout或者原生的dom事件中, setState是同步的
 */
