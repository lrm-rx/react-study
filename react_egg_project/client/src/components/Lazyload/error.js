import React, { PureComponent } from "react";

export class Error extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>组件引入错误!</div>;
  }
}

export default Error;
