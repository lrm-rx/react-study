import React, { PureComponent } from 'react'

export default class ClassTitleChange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    document.title = this.state.count;
    console.log("订阅事件");
  }
  componentDidUpdate() {
    document.title = this.state.count;
  }
  componentWillUnmount() {
    console.log("取消事件订阅");
  }
  render() {
    return (
      <div>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={e => this.setState({count: this.state.count + 1})}>+1</button>
      </div>
    )
  }
}
