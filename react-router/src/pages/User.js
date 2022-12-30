import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

export default class User extends PureComponent {
  state = {
    isLogin: true
  }
  render() {
    return this.state.isLogin ? (
      <div>
        <h2>User</h2>
        <h3>用户名: Ming</h3>
      </div>
    ):<Redirect to="/login" />
  }
}
