import { CHANGE_NEWSLIST } from './constants.js'

const initialHomeState = {
  newsList: []
}
// 拆分homeReducer
function homeReducer(state = initialHomeState, action) {
  switch (action.type) {
    case CHANGE_NEWSLIST:
      return { ...state, newsList: action.news }
    default:
      return state;
  }
}

export default homeReducer;