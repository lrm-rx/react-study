import React, { Component } from 'react'

// 创建Context对象
const UserContext = React.createContext({
  nickname: 'abc',
  level: 10
})

function ProfileHeader() {
  return (
    <UserContext.Consumer>
      {
        value => {
          return (
            <div>
              <h2>用户昵称: {value.nickname}</h2>
              <h2>用户等级: {value.level}</h2>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  )
}

function Profile(props) {
  return (
    <div>
      <ProfileHeader />
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
      </div>
    )
  }
}
