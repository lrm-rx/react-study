import React from 'react'
// import { connect } from '../utils/connect';
import { connect } from 'react-redux'
import {
  decAction,
  subAction
} from "../store/count/actionCreators"

function About(props) {
  return (
    <div>
      <hr />
      <h2>About</h2>
      <h2>当前计数: {props.count}</h2>
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    count: state.countInfo.count
  }
};
const mapDispachToProps = dispatch => {
  return {
    decrement() {
      dispatch(decAction())
    },
    subNumber(num) {
      dispatch(subAction(num))
    }
  }
};
export default connect(mapStateToProps, mapDispachToProps)(About)

// export default class About extends PureComponent {
//   render() {
//     const { count } = this.props;
//     return (
//       <div>
//         <hr />
//         <h2>About</h2>
//         <h2>当前计数: {count}</h2>
//         <button onClick={e => this.props.decrement()}>-1</button>
//         <button onClick={e => this.props.subNumber(5)}>-5</button>
//       </div>
//     )
//   }
// }
