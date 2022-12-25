import React, { Component } from 'react'

function ProfileHeader(props) {
  return (
    <div>
      <h2>用户昵称: {props.nickname}</h2>
      <h2>用户等级: {props.level}</h2>
    </div>
  )
}

function Profile(props) {
  return (
    <div>
      <ProfileHeader {...props}></ProfileHeader>
      <ul>
        <li>设置1</li>
        <li>设置2</li>
      </ul>
    </div>
  )
}
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nickname: 'ming',
      level: 99
    }
  }
  render() {
    return (
      <div>
        <Profile {...this.state}></Profile>
      </div>
    )
  }
}
