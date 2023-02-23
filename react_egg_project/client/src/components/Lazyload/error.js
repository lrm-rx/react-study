import React, { Component } from "react";

export class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>组件引入错误!</div>;
  }
}

export default Error;
