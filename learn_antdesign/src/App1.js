import React, { PureComponent } from 'react'
import classNames from 'classnames'

export default class App extends PureComponent {
  state = {
    isActive: true
  }
  render() {
    const { isActive } = this.state;
    const errorClass = "error";
    const warnClass = undefined;
    return (
      <div>
        {/* 原生React添加calss方法 */}
        <h2 className={"foo bar active title"}>我是标题1</h2>
        <h2 className={"title" + (isActive ? " active" : "")}>我是标题2</h2>
        <h2 className={["title", (isActive ? "active" : "")].join(" ")}>我是标题3</h2>

        {/* classnames库添加class */}
        <h2 className="foo bar active title">我是标题4</h2>
        <h2 className={classNames("foo", "bar")}>我是标题5</h2>
        <h2 className={classNames("foo", {"active": isActive, "show": true})}>我是标题6</h2>
        <h2 className={classNames("foo", errorClass, warnClass)}>我是标题7</h2>
        <h2 className={classNames(["foo", "bar"])}>我是标题8</h2>
        <h2 className={classNames("foo", {"active": isActive, "show": true})}>我是标题9</h2>
      </div>
    )
  }
}
