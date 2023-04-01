import React from 'react'
import './App.css' // 导入样式
// import avatar from './images/avatar.png' // 导入图片
import { Count } from './Components/count'
import { Tabs } from './Components/Tabs'
import { Form } from './Components/Form'
import { List } from './Components/List'
import { request } from './utils'

export class App extends React.Component {
  // 定义数据
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [],
    active: 'hot',
    list: []
  }

  // 持久化存储数据
  // 获取数据
  async componentDidMount() {
    // const list = JSON.parse(localStorage.getItem('list') || '[]')
    // this.setState({
    //   list
    // })
    // 获取数据
    const list = await request.get('/list')
    const tabs = await request.get('/tabs')
    // 保存数据
    this.setState({
      list: list.data,
      tabs: tabs.data
    })
  }
  // 持久化保存数据
  // componentDidUpdate() {
  //   localStorage.setItem('list', JSON.stringify(this.state.list))
  // }

  // 发表评论
  submit = async txt => {
    const content = {
      // id: Date.now(),
      author: '小灰灰',
      comment: txt,
      time: new Date(),
      attitude: 0
    }
    await request.post('/list', content)

    // 重新发请求，获取数据
    const list = await request.get('/list')
    // 保存数据
    this.setState({
      list: list.data
    })
    // this.setState({
    //   list: [content, ...this.state.list]
    // })
  }
  // 删除评论
  del = async (e, id) => {
    await request.delete(`/list/${id}`)
    // 获取数据
    const list = await request.get('/list')
    // 保存数据
    this.setState({
      list: list.data
    })
    // this.setState({
    //   list: this.state.list.filter(item => item.id !== id)
    // })
  }
  // 点赞和踩
  changeAttitude = async (id, attitude) => {
    await request.patch(`/list/${id}`, { attitude })
    const newComments = this.state.list.map(item => {
      if (item.id === id) {
        // 修改态度
        return { ...item, attitude: attitude }
      } else {
        return item
      }
    })
    this.setState({
      list: newComments
    })
  }
  // 排序
  changeSortType = type => {
    // console.log(type)
    if (type === 'hot') {
      this.setState({
        // 使用元素数组进行排序
        comments: [...this.state.list.sort((a, b) => b.id - a.id)]
      })
    } else {
      this.setState({
        // 由于为模拟的数据，所以这里把字符串的时间需转换为日期类型
        comments: [...this.state.list.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())]
      })
    }

    this.setState({
      active: type
    })
  }

  render() {
    return (
      <div className="comment-root">
        <div className="comment-container">
          {/* 评论数 */}
          <Count count={this.state.list.length} />

          {/* 排序tab */}
          <Tabs tabs={this.state.tabs} active={this.state.active} changeSortType={this.changeSortType} />

          {/* 发表评论区 */}
          <Form submit={this.submit} />

          {/* 评论列表区 */}
          <List list={this.state.list} changeAttitude={this.changeAttitude} del={this.del} />
        </div>
      </div>
    )
  }
}
