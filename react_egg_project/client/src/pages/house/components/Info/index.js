import React, { useState, useEffect } from "react";
import { Button } from "antd-mobile";

export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="info">
      <div className="info-title">标题</div>
      <div className="info-msg">简介:</div>
      <div className="info-price">价格</div>
      <div className="info-time">发布时间</div>
      <div className="info-time">开始出租</div>
      <div className="info-time">结束出租:</div>
      <Button color="warning" className="info-title">
        预约
      </Button>
    </div>
  );
}
