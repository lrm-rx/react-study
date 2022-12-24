import React, { Component } from 'react'

class Count extends Component {
  info = {
    name: 'ning',
    age: 26
  }
  render() {
    const { clickAdd, transmit } = this.props;
    // console.log(this.info);
    return (
      <div>
        <button onClick={clickAdd}>+1</button>
        <button onClick={() => transmit(this.info)}>将子传递的数据传递给父组件</button>
      </div>
    )
  }

  // changeData = () => {
  //   this.props.transmit(this.info)
  // }
}

export default class App extends Component {
  state = {
    count: 0
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h2>当前计数: {count}</h2>
        <button onClick={e => this.add()}>+1</button>
        <div>以下按钮是子组件触发父组件数据的变化:</div>
        {/* <Count clickAdd={e => this.add()} transmit={this.transmit}></Count> */}
        <Count clickAdd={e => this.add()} transmit={info => this.transmit(info)}></Count>
      </div>
    )
  }
  add() {
    this.setState({
      count: this.state.count + 1
    })
  }
  transmit(info){
    console.log('info', info);
  }
  // transmit = (info) => {
  //   console.log(info);
  // }
}
