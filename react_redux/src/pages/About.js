import React, { PureComponent } from 'react'
import store from '../store'
import { subAction } from '../store/actionCreators';

export default class About extends PureComponent {
  state = {
    count: store.getState().count
  }
  componentDidMount() {
    this.unsubscribue = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribue();
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <hr />
        <h2>About</h2>
        <h2>当前计数: {count}</h2>
        <button onClick={e => this.decrement()}>-1</button>
        <button onClick={e => this.subNumber(5)}>-5</button>
      </div>
    )
  }
  decrement() {
    store.dispatch(subAction(1))
  }

  subNumber(num) {
    store.dispatch(subAction(num))
  }
}
