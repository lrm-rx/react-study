import React, { Component } from 'react'

function Child(props) {
  const {name, age, height} = props;
  return (
    <div>姓名: {name} 年龄: {age} 身高: {height}</div>
  )
}

export default class App extends Component {
  render() {
    const people = {
      name: 'xiaohu',
      age: 25,
      height: 170
    }
    return (
      <div>
        <Child name='ming' age={24} height={168}></Child>
        <Child {...people}></Child>
      </div>
    )
  }
}
