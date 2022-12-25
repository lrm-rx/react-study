import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    friends: [
      {name: 'ning', age: 20},
      {name: 'ming', age: 21},
      {name: 'theshy', age: 22}
    ]
  }
  render() {
    return (
      <div>
        <h2>好友列表:</h2>
        <ul>
          {
            this.state.friends.map((item, index) => {
              return (
                <li key={item.name}>
                  姓名: {item.name} 
                  年龄: {item.age}
                  <button onClick={e => this.incrementAge(index)}>age+1</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={e => this.insertData()}>添加数据</button>
      </div>
    )
  }
  insertData() {
    // 1. 在开发中不要这样来做(不生效)
    // const newData = {name: 'on', age: 22}
    // this.state.friends.push(newData) // 这里和this.state.xx++是一样的
    // this.setState({
    //   friends: this.state.friends
    // })

    // 2. 推荐做法
    const newFriends = [...this.state.friends]
    newFriends.push({name: 'on', age: 22})
    this.setState({
      friends: newFriends
    })
  }

  incrementAge(index) {
    const newFriends = [...this.state.friends];
    newFriends[index].age += 1;
    this.setState({
      friends: newFriends
    })
  }
}
