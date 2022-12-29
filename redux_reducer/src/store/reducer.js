import {reducer as countReducer} from './count'
import {reducer as homeReducer} from './home'

function reducer(state = {}, action) {
  return {
    countInfo: countReducer(state.countInfo, action),
    homeInfo: homeReducer(state.homeInfo, action)
  }
}

export default reducer;