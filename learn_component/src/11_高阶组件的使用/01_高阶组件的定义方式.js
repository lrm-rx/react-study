import React, { PureComponent } from 'react'

class App extends PureComponent {
  render() {
    return (
      <div>
        App: {this.props.name}
      </div>
    )
  }
}

function enhanceComponent(WrappedComponent) {
  class NewComponent extends PureComponent {
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
  // 修改组件名称
  NewComponent.displayName = "lpl";
  return NewComponent;
}

function enhanceComponent2(WrappedComponent) {
  function NewComponent(props) {
    return <WrappedComponent {...props}/>
  }

  NewComponent.displayName = "lpl";
  return NewComponent;
}

const EnhanceComponent = enhanceComponent2(App);

export default EnhanceComponent;

