import React, { PureComponent } from 'react'

export default class Product extends PureComponent {
  render() {
    console.log(this.props.location);
    return (
      <div>
        <ul>
          <li>商品列表1</li>
          <li>商品列表2</li>
          <li>商品列表3</li>
          <li>商品列表4</li>
          <li>商品列表5</li>
          <li>商品列表6</li>
        </ul>
      </div>
    )
  }
}
