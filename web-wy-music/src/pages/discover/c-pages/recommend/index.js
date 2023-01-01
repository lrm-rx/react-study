import React, { memo } from 'react'


import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";

const Recommend = memo(() => {
  return (
    <RecommendWraper>
      <HYTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HYHotRecommend />
          <HYNewAlbum />
          <HYRankingList />
        </RecommendLeft>
        <RecommendRight>
          <HYUserLogin />
          <HYSettleSinger />
          <HYHotRadio />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})

export default Recommend