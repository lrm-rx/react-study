import React, { Component } from 'react'
import TabControl from './TabControl'
import './style.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.titles = ['新款', '精选', '流行']

    this.state = {
      currentTitle: '新款',
      currentIndex: 0
    }
  }
  render() {
    const {currentTitle} = this.state;
    return (
      <div>
        <TabControl titles={this.titles} itemClick={index => this.itemClick(index)} />
        <h2>{currentTitle}</h2>
      </div>
    )
  }
  itemClick(index) {
    this.setState({
      currentTitle: this.titles[index]
    })
  }
}
