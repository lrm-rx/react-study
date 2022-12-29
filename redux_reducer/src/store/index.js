import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from "./reducer.js"
import createSagaMiddleware from 'redux-saga'
import saga from './saga'

// composeEnhancers函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
// 应用一些中间件
// applyMiddleware(中间件1, 中间件2,...)
// 1. 引入thunkMiddleware中间件

// 2. 创建sagaMiddleware中间件
const sagaMiddleware = createSagaMiddleware()

const storeEnhancer = applyMiddleware(thunkMiddleware, sagaMiddleware)

// const store = createStore(reducer)
const store = createStore(reducer, composeEnhancers(storeEnhancer))

sagaMiddleware.run(saga)

export default store;