import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RankingList from './c-cpns/ranking-list';
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";

const Recommend = memo(() => {
  
  return (
    <RecommendWraper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWraper>
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