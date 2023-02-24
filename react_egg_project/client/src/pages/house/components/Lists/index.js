import React, { useState, useEffect } from "react";

export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      <div className="comment-lists">
        <div className="comment-lists_item">
          <img
            alt="user"
            className="avatar"
            src={
              "https://5b0988e595225.cdn.sohucs.com/images/20181128/6bb1e7f87ced4cc8ac36526492f8453e.jpeg"
            }
          />
          <div className="right">
            <div className="right-top">
              <p>{"user"}</p>
              <p>{"time"}</p>
            </div>
            <div className="right-bottom">{"info"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
