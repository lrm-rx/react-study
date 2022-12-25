import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 0,
    msg: 'Hello, React!'
  }
  render() {
    console.log('App render函数被调用');
    return (
      <div>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={this.add}>+1</button>
        <button onClick={this.changeText}>改变文本</button>
      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  changeText = () => {
    this.setState({
      msg: 'Hello, Vue!'
    })
  }
}
