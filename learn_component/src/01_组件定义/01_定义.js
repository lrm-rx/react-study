import React, {Component} from 'react'

// 类组件
// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       msg: 'hello, React!'
//     }
//   }
//   render() {
//     return (
//       <div>App类组件</div>
//     )
//   }
// }

/**
 * 函数式组件的特点:
 * 1. 没有this对象
 * 2. 没有内部的状态
 * 3. 没有生命周期
 */
export default function App(props) {
  return (
    <div>App函数组件</div>
  )
}