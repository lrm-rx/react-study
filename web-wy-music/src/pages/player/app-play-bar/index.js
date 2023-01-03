import React, { useState, memo, useEffect, useRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getSongDetailAction } from '../store/actionCreators';
import { getSizeImage, getPlayUrl, formatMinuteSecond } from '@/utils/format-utils';

import { Slider, message } from 'antd';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style'
const AppPlayerBar = memo(() => {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const dispatch = useDispatch()
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"])
  }), shallowEqual)

  const audioRef = useRef()
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])
  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id)
  }, [currentSong])

  const picUrl = (currentSong.al && currentSong.al.picUrl) || ""
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手"
  const duration = currentSong.dt || 1

  const playMusic = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const timeUpdate = (e) => {
    if(!isChange) {
      setCurrentTime(e.target.currentTime * 1000)
      setProgress(currentTime / duration * 100)
    }
  }

  const timeEnded = (e) => {

  }

  const sliderChange = useCallback((value) => {
    setIsChange(true)
    const currentTime = value / 100.0 * duration
    setCurrentTime(currentTime)
    setProgress(value)
  }, [duration])

  const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100.0 * duration / 1000
    audioRef.current.currentTime = currentTime
    setCurrentTime(currentTime * 1000)
    setIsChange(false)
    if(!isPlaying) {
      playMusic()
    }
  }, [duration, isPlaying, playMusic]);

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev"></button>
          <button className="sprite_playbar btn play" onClick={e => playMusic()}></button>
          <button className="sprite_playbar btn next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{singerName}</span>
            </div>
            <div className="progress">
              <Slider defaultValue={0} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(duration)}</span>
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
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={timeEnded} />
    </PlaybarWrapper>
  )
})

export default AppPlayerBar