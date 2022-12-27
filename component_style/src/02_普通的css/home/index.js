import React, { PureComponent } from 'react'
import './index.css'

export default class Home extends PureComponent {
  render() {
    return (
      <div className='home'>
        <h2 className='title'>我是home的标题</h2>
        <div className='banner'>
          <span>转播图</span>
        </div>
      </div>
    )
  }
}


