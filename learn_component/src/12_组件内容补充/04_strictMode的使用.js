import React, { PureComponent, StrictMode } from 'react'

class Home extends PureComponent {
  constructor(props) {
    super(props)

    console.log('home constructor');
  }
  
  render() {
    return (
      <div ref="title">
        Home
      </div>
    )
  }
}

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    console.log("profile constructor");
  }

  render() {
    return (
      <div ref="title">
        Profile
      </div>
    )
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <StrictMode>
          <Home/>
        </StrictMode>
        <Profile/>
      </div>
    )
  }
}

/**
 * StrictMode
 * 警告: 所有的API有可能在后续的版本弃用
 */
