// export const addAction = (num) => {
//   return {
//     type: "ADD_NUMBER",
//     num
//   }
// }
import axios from 'axios'
import { ADD_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT, CHANGE_NEWSLIST } from './constants.js'
export const addAction = num => ({
  type: ADD_NUMBER,
  num
})

export const subAction = num => ({
  type: SUB_NUMBER,
  num
})

export const incAction = () => ({
  type: INCREMENT
});

export const decAction = () => ({
  type: DECREMENT
});

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
