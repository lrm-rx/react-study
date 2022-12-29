import React, { PureComponent } from 'react';
import axios from 'axios'
// import {connect} from '../utils/connect';
import { connect } from 'react-redux'
import {
  incAction,
  addAction,
} from '../store/count/actionCreators'

import {
  changeNewsListAction,
  fetchHomeMultidataAction
} from '../store/home/actionCreators'

class Home extends PureComponent {
  componentDidMount() {
    this.getNewsList()
  }
  getNewsList() {
    axios({
      url: "https://ku.qingnian8.com/dataApi/news/newslist.php"
    }).then(res => {
      this.props.changeNewsList(res.data)
    }).catch(error => {
      console.error(error);
    })
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数: {this.props.count}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.addNumber(5)}>+5</button>
        <hr/>
        <ul>
          {this.props.newsList.map((item) => {
            return (
              <li key={item.id}>{item.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.countInfo.count,
  newsList: state.homeInfo.newsList
})

const mapDispatchToProps = dispatch => ({
  increment() {
    dispatch(incAction());
  },
  addNumber(num) {
    dispatch(addAction(num));
  },
  changeNewsList(news) {
    dispatch(changeNewsListAction(news));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
