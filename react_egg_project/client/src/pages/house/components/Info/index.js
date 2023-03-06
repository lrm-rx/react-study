import React, { useState, useEffect, memo } from "react";
import { Button } from "antd-mobile";
import { timer } from "@/utils";

function Info(props) {
  const [state, setState] = useState();

  useEffect(() => {}, [props]);

  return (
    <div className="info">
      <div className="info-title">{props?.info?.name}</div>
      <div className="info-msg">简介: {props?.info?.info}</div>
      <div className="info-price">价格: {props?.info?.price}</div>
      <div className="info-time">
        发布时间: {timer(props?.info?.publishTime)}
      </div>
      <div className="info-time">开始出租: {timer(props?.info?.startTime)}</div>
      <div className="info-time">结束出租: {timer(props?.info?.endTime)}</div>
      <Button color="warning" className="info-title">
        预约
      </Button>
    </div>
  );
}

export default memo(Info);
