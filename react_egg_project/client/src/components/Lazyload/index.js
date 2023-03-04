import React, { PureComponent, lazy, Suspense } from "react";

export class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderLazy = () => {
    let Lazy;
    const { component, delay, ...other } = this.props;
    if (!component || component.constructor.name !== "Promise") {
      Lazy = lazy(() => import("./error"));
    } else {
      Lazy = lazy(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(component);
          }, delay || 300);
        });
      });
    }
    return <Lazy {...other} />;
  };
  render() {
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          {this._renderLazy()}
        </Suspense>
      </div>
    );
  }
}

export default Index;
