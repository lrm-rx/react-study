import React, { PureComponent } from 'react'

// Header
function Header() {
  console.log('Header被调用');
  return <h2>我是Header组件</h2>
}

// Banner
class Banner extends PureComponent {
  render() {
    console.log('Banner render函数被调用');
    return <h3>我是Banner组件</h3>
  }
}

function ProductList() {
  console.log('ProductList被调用');
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
    </ul>
  )
}

class Main extends PureComponent {
  render() {
    console.log('Main render函数被调用');
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}

// Footer
function Footer() {
  console.log('Footer被调用');
  return <h2>我是Footer组件</h2>
}
export default class App extends PureComponent {
  state = {
    count: 0
  }
  render() {
    console.log("App render函数被调用");
    return (
      <div>
        <h2>当前计数: {this.state.count}</h2>
        <button onClick={this.add}>+1</button>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
}
