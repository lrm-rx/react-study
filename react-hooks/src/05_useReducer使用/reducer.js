export default function reducer(state, action) {
  switch (action.type) {
    case "increment":
      // return state + 1;
      return { ...state, count: state.count + 1 }
    case "decrement":
      // return state + 1;
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}