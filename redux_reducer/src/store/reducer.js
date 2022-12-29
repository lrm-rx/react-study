import {reducer as countReducer} from './count'
import {reducer as homeReducer} from './home'
import { combineReducers } from 'redux';
// function reducer(state = {}, action) {
//   return {
//     countInfo: countReducer(state.countInfo, action),
//     homeInfo: homeReducer(state.homeInfo, action)
//   }
// }
const reducer = combineReducers({
  countInfo: countReducer,
  homeInfo: homeReducer
})

export default reducer;