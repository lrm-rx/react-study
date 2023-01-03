import { Map } from 'immutable'
import * as actionTypes from './constants'
const defaultState = Map({
  topBanners: [], // 轮播
  hotRecommends: [], // 热门推荐
  newAlbums: [], // 新碟上架
  topUpList: {}, // 飙升榜
  topNewList: {}, // 新歌榜
  topOriginList: {}, // 原创榜

  // id: 2884035, name: '原创榜'
  // id: 3779629, name: '新歌榜'
  // id: 19723756, name: '飙升榜'
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set("topBanners", action.topBanners)
    case actionTypes.CHANGE_HOT_RECOMMEND:
      return state.set("hotRecommends", action.hotRecommends)
    case actionTypes.CHANGE_NEW_ALBUM:
      return state.set("newAlbums", action.newAlbums)
    case actionTypes.CHANGE_UP_LIST:
      return state.set("topUpList", action.topUpList)
    case actionTypes.CHANGE_NEW_LIST:
      return state.set("topNewList", action.topNewList)
    case actionTypes.CHANGE_ORIGIN_LIST:
      return state.set("topOriginList", action.topOriginList)
    default:
      return state;
  }
}

export default reducer;