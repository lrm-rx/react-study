import React, { useState, useEffect, memo } from "react";
import "./index.less";

function OrderSkeleton(props) {
  const [state, setState] = useState(Array(3).fill(1));

  useEffect(() => {}, []);

  return (
    <div className="order-skeletons">
      {state.map((item) => (
        <div className="order-item" key={item}>
          <div className={"skeletons left"}></div>
          <div className="center">
            <div className={"skeletons title"}></div>
            <div className={"skeletons price"}></div>
            <div className={"skeletons time"}></div>
          </div>
          <div className={"skeletons pay"}></div>
        </div>
      ))}
    </div>
  );
}

export default memo(OrderSkeleton);
