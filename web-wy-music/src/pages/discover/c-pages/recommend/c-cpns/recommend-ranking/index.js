import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopData } from '../../store/actionCreators';

import ThemeHeaderRCM from '@/components/theme-header-rcm';

import { RankingWrapper } from './style'
import TopRanking from "@/components/top-ranking";

const RecommendRanking = memo(() => {
  const dispatch = useDispatch()
  const { topUpList, topNewList, topOriginList } = useSelector(state => ({
    topUpList: state.getIn(["recommend", "topUpList"]),
    topNewList: state.getIn(["recommend", "topNewList"]),
    topOriginList: state.getIn(["recommend", "topOriginList"])
  }), shallowEqual)
  useEffect(() => {
    dispatch(getTopData(19723756));
    dispatch(getTopData(3779629));
    dispatch(getTopData(2884035));
  }, [dispatch])
  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" />
      <div className="tops">
        <TopRanking info={topUpList}/>
        <TopRanking info={topNewList}/>
        <TopRanking info={topOriginList}/>
      </div>
    </RankingWrapper>
  )
})

export default RecommendRanking