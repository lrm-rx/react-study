import React, { Component } from 'react'

// 创建Context对象
const UserContext = React.createContext({
  nickname: 'abc',
  level: 10
})

class ProfileHeader extends Component {
  static contextType = UserContext
  render() {
    console.log(this.context.nickname);
    return (
      <div>
        <h2>用户昵称: {this.context.nickname}</h2>
        <h2>用户等级: {this.context.level}</h2>
      </div>
    )
  }
}

// ProfileHeader.contextType = UserContext;

function Profile(props) {
  return (
    <div>
      <ProfileHeader></ProfileHeader>
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
      level: 18
    }
  }
  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <Profile></Profile>
        </UserContext.Provider>
        {/* 以下用默认值 */}
        <Profile></Profile>
      </div>
    )
  }
}
