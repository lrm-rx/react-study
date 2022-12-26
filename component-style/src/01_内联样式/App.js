import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    color: 'purple'
  }
  render() {
    const pStyle = {
      color: this.state.color,
      textDecoration: "underline"
    }
    return (
      <div>
        <h2 style={{fontSize: "52px", color: "pink"}}>我是标题</h2>
        <p>这是一段文字描述</p>
      </div>
    )
  }
}
