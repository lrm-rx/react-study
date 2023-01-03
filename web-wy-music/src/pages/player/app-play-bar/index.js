import React, { memo } from 'react'
import { NavLink } from 'react-router-dom';

import { getPlayUrl, formatMinuteSecond } from '@/utils/format-utils';

import { Slider, message } from 'antd';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style'
const AppPlayerBar = memo(() => {
  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control>
          <button className="sprite_playbar btn prev"></button>
          <button className="sprite_playbar btn play"></button>
          <button className="sprite_playbar btn next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/">
              <img src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34" alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">有何不可</span>
              <span className="singer-name">许嵩</span>
            </div>
            <div className="progress">
              <Slider value={30}/>
              <div className="time">
                <span className="now-time">02:23</span>
                <span className="divider">/</span>
                <span className="total-time">03:25</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist">6</button>
          </div>
        </Operator>
      </div>

    </PlaybarWrapper>
  )
})

export default AppPlayerBar