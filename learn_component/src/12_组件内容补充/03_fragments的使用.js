import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    count: 0,
    friends: [
      {name: 'ming', age: 23},
      {name: 'uzi', age: 26},
      {name: 'xiaohu', age: 26}
    ]
  }
  render() {
    return (
      <>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={this.add}>+1</button>
        <div>
          {
            this.state.friends.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div>{item.name}</div>
                  <p>{item.age}</p>
                  <hr/>
                </Fragment>
              )
            })
          }
        </div>
      </>
    )
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
}
