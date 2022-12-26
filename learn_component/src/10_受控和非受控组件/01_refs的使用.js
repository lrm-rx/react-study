import React, { PureComponent, createRef } from 'react'

class Count extends PureComponent {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={this.add}>+1</button>
      </div>
    )
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
}
export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.titleRef = createRef();
    this.countRef = createRef();
    this.titleEl = null;
  }
  render() {
    return (
      <div>
        {/* <h2 ref=字符串/对象/函数>Heloo React</h2> */}
        <h2 ref="titleRef">Hello React</h2>
        {/* 目前React推荐的方式 */}
        <h2 ref={this.titleRef}>Hello React</h2>
        <h2 ref={c => this.titleEl = c}>Hello React</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <hr />
        <Count ref={this.countRef}></Count>
        <button onClick={this.appBtnClick}>App按钮</button>
      </div>
    )
  }

  changeText() {
    // 1. 使用方式一: 字符串(不推荐,后续的更新会删除)
    this.refs.titleRef.innerHTML = 'Hello Vue';
    // 2. 使用方式二: 对象方式
    this.titleRef.current.innerHTML = 'Hello Nodejs';
    // 3. 使用方式三: 回调函数方式
    this.titleEl.innerHTML = 'Hello TS'
  }

  appBtnClick = () => {
    this.countRef.current.add();
  }
}
