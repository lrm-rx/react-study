import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getTopBannerAction } from '../../store/actionCreators'
// import {
//   getBanner
// } from '../../store/actionCreators';

import { Carousel } from 'antd';
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style';

const TopBanner = memo((props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 组件和redux关联: 获取数据和进行操作
  const { topBanners } = useSelector(state => ({
    // topBanners: state.recommend.topBanners
    // topBanners: state.get("recommend").get("topBanners")
    topBanners: state.getIn(["recommend", "topBanners"])
  }), shallowEqual)
  const dispatch = useDispatch()
  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  const bannerRef = useRef();

  const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurrentIndex(from);
    }, 0);
  }, []);

  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel autoplay effect="fade" beforeChange={bannerChange} ref={bannerRef}>
            {
              topBanners.map((item, index) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl className="control">
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default TopBanner