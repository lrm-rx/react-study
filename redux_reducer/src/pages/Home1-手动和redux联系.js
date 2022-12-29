import React, { PureComponent } from 'react'
import store from '../store'
import {
  addAction
} from '../store/count/actionCreators'

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().count
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h2>Home</h2>
        <h2>当前计数: {count}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.addNumber(5)}>+5</button>
      </div>
    )
  }
  increment() {
    store.dispatch(addAction(1))
  }

  addNumber(num) {
    store.dispatch(addAction(num))
  }
}
