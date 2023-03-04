import React, { useState, useEffect, memo } from "react";
import { ShowLoading } from "@/components";
import { timer } from "@/utils";

function List(props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      <div className="comment-lists">
        {props?.lists?.map((item) => (
          <div className="comment-lists_item" key={item?.id}>
            <img alt="user" className="avatar" src={item?.avatar} />
            <div className="right">
              <div className="right-top">
                <p>{item?.username}</p>
                <p>{timer(item?.createTime, "all")}</p>
              </div>
              <div className="right-bottom">{item?.info}</div>
            </div>
          </div>
        ))}

        <ShowLoading showLoading={props?.showLoading} />
      </div>
    </div>
  );
}

export default memo(List);
