import React, { Component } from 'react'
import './style.css'

import NavBar from './NavBar'
import NavBar2 from './NavBar2'


export default class App extends Component {
  render() {
    const leftJsx = <span>aaa</span>
    return (
      <div>
        <NavBar>
          <span>昵称: ming</span>
          <div>年龄: 25</div>
          <a href="https://www.baidu.com" target="_blank">百度一下</a>
        </NavBar>

        {/* <NavBar2 
          leftSlot={leftJsx}
          centerSlot={<div>bbb</div>}
          rightSlot={<a herf="/#">ccc</a>}
        ></NavBar2> */}
      </div>
    )
  }
}
