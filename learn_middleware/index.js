import store from './store/index.js'
import {
  addAction,
  subAction,
  incAction,
  decAction
} from './store/actionCreators.js'

// 订阅
// store.subscribe(() => {
//   console.log(store.getState());
// })

// 派发
// // 1. 基本做法
// console.log("dispatch前: dispatching action:", addAction(10));
// store.dispatch(addAction(10))
// console.log("dispatch后: new state:", store.getState());


// console.log("dispatch前: dispatching action:", addAction(10));
// store.dispatch(addAction(15))
// console.log("dispatch后: new state:", store.getState());

// 2. 封装一个函数
// function dispatchAndLogging(action) {
//   console.log("dispatch前: dispatching action:", action);
//   store.dispatch(action)
//   console.log("dispatch后: new state:", store.getState());
// }

// dispatchAndLogging(addAction(10))
// dispatchAndLogging(addAction(15))

// 3. 在函数的基础之上进行优化: 修改原有的dispatch

// const next = store.dispatch;
// function dispatchAndLogging(action) {
//   console.log("dispatch前: dispatching action:", action);
//   next(action)
//   console.log("dispatch后: new state:", store.getState());
// }
// store.dispatch = dispatchAndLogging;

// store.dispatch(addAction(10))
// store.dispatch(addAction(15))

// 4. 将之前的操作进行封装
function patchLogging(store) {
  const next = store.dispatch;
  function dispatchAndLogging(action) {
    console.log("dispatch前: dispatching action:", action);
    next(action)
    console.log("dispatch后: new state:", store.getState());
  }
  // store.dispatch = dispatchAndLogging;
  return dispatchAndLogging
}

function patchThunk(store) {
  const next = store.dispatch;
  function dispatchAndThunk(action) {
    if(typeof action === "function") {
      action(store.dispatch, store.getState)
    }else{
      next(action)
    }
  }
  // store.dispatch = dispatchAndThunk
  return dispatchAndThunk
}
patchLogging(store)
patchThunk(store)

// store.dispatch(addAction(10))
// store.dispatch(addAction(15))

// function foo(dispatch, getState) {
//   // console.log(dispatch, getState);
//   dispatch(subAction(2))
// }
// store.dispatch(foo)

// 5. 封装applyMiddleware
function applyMiddleware(...middlewares) {
  // const newMiddleware = [...middlewares]
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store)
  })

}

applyMiddleware(patchLogging, patchThunk)