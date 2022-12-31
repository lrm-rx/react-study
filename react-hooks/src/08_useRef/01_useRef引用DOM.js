import React, { useRef, PureComponent } from 'react'

class TestCpn extends PureComponent {
  render() {
    return <h2>TestCpn</h2>
  }
}

function FnCpn(props) {
  return <h2>FnCpn</h2>
}
export default function RefHookDemo01() {
  const titleRef = useRef();
  const inputRef = useRef();
  const testCpnRef = useRef();
  const fnCpnRef = useRef();

  function changeDOM() {
    titleRef.current.innerHTML = "Hello, React Hooks";
    inputRef.current.focus();
    console.log(testCpnRef.current);
    // console.log(fnCpnRef.current);
  }
  return (
    <div>
      <h2 ref={titleRef}>RefHookDemo01</h2>
      <input ref={inputRef}/>
      <TestCpn ref={testCpnRef}/>
      {/* 不可以这样子使用ref */}
      {/* <FnCpn ref={fnCpnRef}/> */}

      <button onClick={e => changeDOM()}>修改DOM</button>
    </div>
  )
}
