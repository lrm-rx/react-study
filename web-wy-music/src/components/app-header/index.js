import React, { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { headerLinks } from '@/common/local-data'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from "antd";
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

// 页面代码
const showSelectItem = (item, index) => {
  if(index < 3) {
    return (
      <NavLink to={item.link}>
        {item.title}
        <i className="sprite_01 icon"></i>
      </NavLink>
    )
  }else{
    return <a href={item.link}>{item.title}</a>
  }
}
const AppHeader = memo(() => {
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <Link to={{ pathname: "/" }} replace className="logo sprite_01">网易云音乐</Link>
          <div className="select-list">
            {
              headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className="select-item">
                    {showSelectItem(item, index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />}/>
          <div className="center">创作者中心</div>
          <div>登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
})

export default AppHeader