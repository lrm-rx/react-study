import React from 'react'

export class Tabs extends React.Component {
  render() {
    return (
      <div className="tabs-order">
        {this.props.tabs.map(item => (
          <div
            onClick={() => this.props.changeSortType(item.type)}
            key={item.id}
            className={item.type === this.props.active ? 'on' : ''}
          >
            按{item.name}排序
          </div>
        ))}
      </div>
    )
  }
}
