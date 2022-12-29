import axios from 'axios'
import { CHANGE_NEWSLIST, FETCH_HOME_MULTIDATA } from './constants.js'


// 新闻列表
export const changeNewsListAction = (news) => ({
  type: CHANGE_NEWSLIST,
  news
})

// redux-thunk中定义的action函数
export const getHomeMultidataAction = dispatch => {
  axios({
    url: "https://ku.qingnian8.com/dataApi/news/newslist.php"
  }).then(res => {
    dispatch(changeNewsListAction(res.data))
  }).catch(error => {
    console.error(error);
  })
}

// redux-saga拦截的action
export const fetchHomeMultidataAction = {
 type: FETCH_HOME_MULTIDATA
}
