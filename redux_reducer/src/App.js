import React, { PureComponent } from 'react'
import Home from './pages/Home5-redux-saga'
import About from './pages/About4'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <About /> 
      </div>
    )
  }
}
