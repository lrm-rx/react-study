import * as actionTypes from './constants'

import {
  getSongDetail
} from '@/services/player'

const changeSongDetailAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

export const getSongDetailAction = (ids) => {
  return dispatch => {
    getSongDetail(ids).then(res => {
      dispatch(changeSongDetailAction(res.songs[0]))
    })
  }
}