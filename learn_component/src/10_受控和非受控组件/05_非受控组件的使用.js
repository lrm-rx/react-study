import React, { PureComponent, createRef } from 'react'

export default class App extends PureComponent {
  usernameRef = createRef()
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="username">
          用户:
          <input
            type="text"
            id="username"
            ref={this.usernameRef}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.usernameRef.current.value);
  }
}
