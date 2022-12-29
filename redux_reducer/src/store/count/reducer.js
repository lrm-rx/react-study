import { ADD_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT } from './constants.js'


const initialCountState = {
  count: 0
}
// 拆分countReducer
function countReducer(state = initialCountState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, count: state.count + action.num }
    case SUB_NUMBER:
      return { ...state, count: state.count - action.num }
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export default countReducer;