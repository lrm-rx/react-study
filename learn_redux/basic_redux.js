const redux = require('redux')

const initalState = {
  count: 0
}
// reducer (纯函数)
function reducer(state = initalState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 }
    case "DECREMENT":
      return { ...state, count: state.count - 1 }
    case "ADD_NUMBER":
      return { ...state, count: state.count + action.num }
    case "SUB_NUMBER":
      return { ...state, count: state.count - action.num }
    default:
      return state
  }
}

// store(创建的时候需要传入一个reducer)
const store = redux.createStore(reducer)

// actions
const action1 = { type: "INCREMENT" };
const action2 = { type: "DECREMENT" };

const action3 = { type: "ADD_NUMBER", num: 5 }
const action4 = { type: "SUB_NUMBER", num: 10 }

// 订阅store的修改
store.subscribe(() => {
  console.log("count:", store.getState().count);
})

// 派发action
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);


