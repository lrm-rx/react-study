import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello React!"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
        <button id="btn">改变文本2</button>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById("btn").addEventListener("click", (e) => {
      this.setState({
        message: "Hello, Vue!"
      })
      console.log(this.state.message);
    })

    // this.setState({
    //   message: "Hello, Node!"
    // })
    // console.log(this.state.message);
  }

  changeText() {
    // 情况一: 将setState放入到定时器中
    setTimeout(() => {
      this.setState({
        message: "Hello, Vue!"
      })
      console.log(this.state.message);
    }, 0);
  }
}

