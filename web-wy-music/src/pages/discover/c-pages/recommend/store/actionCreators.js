import * as actionTypes from './constants'

import { getTopBanner, getHotRecommend, getNewAlbum } from '@/services/recommend'

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