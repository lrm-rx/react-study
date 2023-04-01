import React, { Component } from 'react'
import avatar from '../images/avatar.png' // 导入图片

export class List extends Component {
  render() {
    return (
      <div className="comment-list">
        {this.props.list.map(item => (
          <div className="comment-item" key={item.id}>
            <div>
              <img className="user-head" src={avatar} alt="头像" />
            </div>

            <div className="comment">
              <div className="user">{item.author}</div>
              <p className="text">{item.comment}</p>
              <div className="info">
                <span className="time">{item.time.toLocaleString()}</span>
                {/* 点赞 */}
                <span
                  onClick={() => this.props.changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}
                  className={item.attitude === 1 ? 'like liked' : 'like'}
                >
                  <i className="icon" />
                </span>
                {/* 踩 */}
                <span
                  onClick={() => this.props.changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}
                  className={item.attitude === -1 ? 'hate hated' : 'hate'}
                >
                  <i className="icon" />
                </span>
                <span onClick={e => this.props.del(e, item.id)} className="btn-hover">
                  删除
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
