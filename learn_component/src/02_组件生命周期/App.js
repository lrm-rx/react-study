import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      isShow: true
    }
    console.log('执行了组件的constructor方法');
  }
  componentDidMount() {
    console.log('执行了组件的componentDidMount方法');
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('执行了组件的componentDidUpdate方法');
  }
  render() {
    console.log('执行了组件的render方法');
    return (
      <div>
        <div>组件生命周期</div>
        <h2>{this.state.count}</h2>
        <button onClick={() => this.add()}>+2</button>
        <button onClick={() => this.show()}>按钮</button>
        {this.state.isShow && <Lpl />}
      </div>
    )
  }
  add() {
    this.setState({
      count: this.state.count + 2
    })
  }
  show() {
    this.setState({
      isShow: !this.state.isShow
    })
  }
}

class Lpl extends Component {
  componentWillUnmount() {
    console.log('子组件Lpl执行了组件的componentWillUnmount方法');
  }
  render() {
    return (
      <div>子组件</div>
    )
  }
}