import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getTopBannerAction } from './store/actionCreators'

import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";

const Recommend = memo((props) => {
  // 组件和redux关联: 获取数据和进行操作
  const { topBanners } = useSelector(state => ({
    topBanners: state.recommend.topBanners
  }), shallowEqual)
  const dispatch = useDispatch()
  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])
  return (
    <div>
      Recommend:{topBanners.length}
    </div>
  )
})

export default Recommend

// const Recommend = memo((props) => {
//   const { getBanners, topBanners } = props;
//   useEffect(() => {
//     getBanners()
//   }, [getBanners])
//   return (
//     <div>
//       Recommend: {topBanners.length}
//     </div>
//   )
// })

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction())
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Recommend)