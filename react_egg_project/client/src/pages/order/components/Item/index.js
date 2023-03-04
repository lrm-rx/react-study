import React, { useState, useEffect, memo } from "react";
import { Button, Toast } from "antd-mobile";
import { Http, timer } from "@/utils";

function Item(props) {
  const [state, setState] = useState();

  const handlePay = async () => {
    return Toast.show({
      icon: "fail",
      content: "接口开发中!",
    });
    // const result = await Http({
    //   url: "/orders/pay",
    //   body: {
    //     id: props.id,
    //   },
    // });
    // if (result) {
    //   Toast.show({
    //     icon: "success",
    //     content: "支付成功!",
    //   });
    //   window.location.reload();
    // }
  };

  useEffect(() => {}, []);

  const renderPay = () => {
    switch (props.type) {
      case 0:
        return (
          <Button color="warning" size="small" onClick={handlePay}>
            去支付
          </Button>
        );
      case 1:
        return <Button size="small">已完成</Button>;

      default:
        break;
    }
  };

  return (
    <div className="order-item">
      <img alt="order" src={props?.img} />
      <div className="center">
        <div className="title">{props?.title}</div>
        <div className="price">{props?.price}</div>
        <div className="time">{timer(props?.createTime, "day")}</div>
      </div>
      <div className="pay">{renderPay()}</div>
    </div>
  );
}
export default memo(Item);
