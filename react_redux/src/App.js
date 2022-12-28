import React, { PureComponent } from 'react'
import Home from './pages/Home4-redux-thunk'
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
