import React from 'react'

export class Count extends React.Component {
  render() {
    return (
      <div className="comment-number">
        <span>{this.props.count} 评论</span>
      </div>
    )
  }
}
