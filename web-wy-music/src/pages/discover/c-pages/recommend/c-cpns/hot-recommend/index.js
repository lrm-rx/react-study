import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import ThemeHeaderRCM from '@/components/theme-header-rcm'
import { getHotRecommendAction } from '../../store/actionCreators'

import { HotRecommendWrapper } from './style'
import SongsCover from '@/components/songs-cover'

const HotRecommend = memo(() => {

  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotRecommendAction())
  }, [dispatch])
  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]} />
      <div className="recommend-list">
        {
          hotRecommends.slice(0, 8).map((item, index) => {
            return (
              <SongsCover info={item} key={item.id}/>
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})

export default HotRecommend