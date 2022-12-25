import React, { Component } from 'react'

function Home(props) {
  return <h2>{props.msg}</h2>
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      msg: 'Hello, React!'
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数: {this.state.msg}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <Home msg={this.state.msg}></Home>
      </div>
    )
  }
  componentDidUpdate() {
    // 方式二: 获取异步更新的state
    console.log('componentDidUpdate获取异步更新的state', this.state.msg);
  }
  changeText() {
    /**
     * 2. setState是异步更新
     * this.setState({
     *    msg: 'Hello, Vue!'
     * })
     * console.log('state的值:', this.state.msg) // state的值: Hello, React!
     */
    
    // 方式一: 
    this.setState({
       msg: 'Hello, Vue!'
    }, (...data) => {
      console.log(data);
      console.log('setState获取异步更新的state: ', this.state.msg);
    })
  }
}
