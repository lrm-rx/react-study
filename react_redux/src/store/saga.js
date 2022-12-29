import { takeEvery, put } from 'redux-saga/effects'
import { FETCH_HOME_MULTIDATA } from './constants'
import axios, { all } from 'axios'
import { changeNewsListAction } from './actionCreators'

function* fetchHomeMultidata(action) {
  const res = yield axios({
    url: "https://ku.qingnian8.com/dataApi/news/newslist.php"
  })
  // console.log('saga: res', res);
  yield put(changeNewsListAction(res.data))
  // yield put(xxx(res))
  // yield all([
  //   yield put(changeNewsListAction(res.data))
  // // yield put(xxx(res))
  // ])
}

function* mySage() {
  // takeLatest takeEvery区别:
  // takeLatest: 依次只能监听一个对应的action
  // takeEvery: 每一个都会被执行
  yield takeEvery(FETCH_HOME_MULTIDATA, fetchHomeMultidata)
}

export default mySage;