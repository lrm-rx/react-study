import React, { Component } from 'react'

class Child extends Component {
  constructor(){
    super()
  }
  componentDidMount() {
    console.log('父组件传递过来的值:', this.props);
  }
  render() {
    const {name, age, height} = this.props;
    return (
      <h2>子组件展示的数据: {`姓名:${name} 年龄:${age} 身高:${height}`}</h2>
    )
  }
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
