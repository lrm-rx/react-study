import React, { PureComponent } from 'react'
import './index.css'
import Home from '../home'
import Profile from '../profile'

export default class App extends PureComponent {
  render() {
    return (
      <div id="app">
        App
        <h2 className='title'>我是App的title</h2>
        <Home />
        <Profile />
      </div>
    )
  }
}
