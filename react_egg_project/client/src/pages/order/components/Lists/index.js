import React, { useState, useEffect, memo } from "react";
import { isEmpty } from "project-libs";
import OrderItem from "../Item";
import { ShowLoading } from "@/components";
import { OrderSkeletons } from "@/skeletons";

function OrderList(props) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isEmpty(props?.orders)) {
        setState(true);
      }
    }, 1500);
  }, []);

  return (
    <div>
      {isEmpty(props?.orders) ? (
        <>
          <ShowLoading showLoading={false} /> : <OrderSkeletons />
        </>
      ) : (
        <div className="tab-lists">
          {props.orders.map((item) => (
            <OrderItem type={props.type} key={item.id} {...item} />
          ))}
          <ShowLoading showLoading={props.showLoading} />
        </div>
      )}
    </div>
  );
}

export default memo(OrderList);
