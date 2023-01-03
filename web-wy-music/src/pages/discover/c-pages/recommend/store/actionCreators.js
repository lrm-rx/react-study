import * as actionTypes from './constants'

import {
  getTopBanner,
  getHotRecommend,
  getNewAlbum,
  getTopList
} from '@/services/recommend'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanner().then(res => {
      dispatch(changeTopBannerAction(res))
    })
  }
}

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommend().then(res => {
      dispatch(changeHotRecommendAction(res))
    })
  }
}

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

export const getNewAlbumAction = (limit, offset) => {
  return dispatch => {
    getNewAlbum(limit, offset).then(res => {
      dispatch(changeNewAlbumAction(res))
    })
  }
}

const changeUpListAction = (res) => ({
  type: actionTypes.CHANGE_UP_LIST,
  topUpList: res.playlist
})

const changeNewListAction = (res) => ({
  type: actionTypes.CHANGE_NEW_LIST,
  topNewList: res.playlist
})

const changeOriginListAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_LIST,
  topOriginList: res.playlist
})

// export const getTopUpListAction = (idx) => {
//   return dispatch => {
//     getTopList(idx).then(res => {
//       dispatch(changeTopUpListAction(res))
//     })
//   }
// }

export const getTopData = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 19723756:
          dispatch(changeNewListAction(res));
          break;
        case 3779629:
          dispatch(changeOriginListAction(res));
          break;
        case 2884035:
          dispatch(changeUpListAction(res));
          break;
        default:
          console.log("其他数据处理");
      }
    })
  }
}
