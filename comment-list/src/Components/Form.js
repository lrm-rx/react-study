import React, { Component } from 'react'
import avatar from '../images/avatar.png' // 导入图片

export class Form extends Component {
  state = {
    // 发表评论的数据
    content: ''
  }
  // 发表评论,非控组件
  txtRef = React.createRef()
  // 箭头发表评论
  handerContent = e => {
    this.setState({
      content: e.target.value
    })
  }
  // 增加评论
  add = () => {
    // 提交新增
    this.props.submit(this.state.content)
    // 清空表单
    this.setState({
      content: ''
    })
    // 发表完评论，获取焦点
    this.txtRef.current.focus()
  }

  render() {
    return (
      <div className="comment-send-container">
        <div>
          <img className="user-head" src={avatar} alt="头像" />
        </div>
        <div className="comment-send">
          <div className="textarea-container">
            <textarea
              value={this.state.content}
              onChange={e => this.handerContent(e)}
              ref={this.txtRef}
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
            />
            <button onClick={() => this.add()} className="comment-submit">
              发表评论
            </button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>
      </div>
    )
  }
}
