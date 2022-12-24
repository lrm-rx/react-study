import React, { Component } from 'react'
import PropTypes from 'prop-types'


function Child2(props) { }
Child2.propTypes = {

}
Child2.defaultProps = {

}
class Child extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    height: PropTypes.number,
    names: PropTypes.array
  }
  static defaultProps = {
    name: 'theshy',
    age: 25,
    height: 172,
    likes: ['lol', '123', '45125']
  }
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('父组件传递过来的值:', this.props);
  }
  render() {
    const { name, age, height, likes } = this.props;
    return (
      <>
        <h2>子组件展示的数据: {`姓名:${name} 年龄:${age} 身高:${height}`}</h2>
        <ul>
          {likes.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })}
        </ul>
      </>
    )
  }
}

export default class App extends Component {
  render() {
    const people = {
      name: 'xiaohu',
      age: 25,
      height: 170,
      likes: ['lol', 'qq飞车']
    }
    return (
      <div>
        <Child name='ming' age={24} height={168} likes={['做饭', '打代码']}></Child>
        <Child {...people}></Child>
        <Child></Child>
      </div>
    )
  }
}
