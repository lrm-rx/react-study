import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello World",
      name: "ming"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <h2>{this.state.name}</h2>
        <button onClick={e => this.changeText()}>改变文本</button>
      </div>
    )
  }

  changeText() {
    this.setState({
      message: "Hello, React!"
    });

    // Object.assign({}, this.state, {message: "Hello, React!"})
  }
}
