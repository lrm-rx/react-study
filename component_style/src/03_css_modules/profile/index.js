import React, { PureComponent } from 'react'
import profileStyle from './index.module.css'

export default class Proflie extends PureComponent {
  state = {
    color: "purple"
  }
  render() {
    return (
      <div className='profile'>
        <h2 className={profileStyle.title} style={{color: this.state.color}}>我是Profile的标题</h2>
        <ul className={profileStyle.settings}>
          <li className={profileStyle.settingItem}>设置列表1</li>
          <li>设置列表2</li>
          <li>设置列表3</li>
        </ul>
      </div>
    )
  }
}
