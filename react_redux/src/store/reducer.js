import { ADD_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT, CHANGE_NEWSLIST } from './constants.js'
const defaultState = {
  count: 0,
  newsList: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, count: state.count + action.num }
    case SUB_NUMBER:
      return { ...state, count: state.count - action.num }
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case CHANGE_NEWSLIST:
      return {...state, newsList: action.news}
    default:
      return state;
  }
}

export default reducer;