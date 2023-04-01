import { memo, Fragment } from "react";
import { FormWraper } from "./style";
import avatar from "@assets/images/avatar.png";

export const Form = memo(() => {
  return (
    <FormWraper>
      <div>
        <img className="user-head" src={avatar} alt="头像" />
      </div>
      <div className="comment-send">
        <div className="textarea-container">
          <textarea
            value="11"
            onChange={() => {}}
            ref={() => {}}
            cols="80"
            rows="5"
            placeholder="发条友善的评论"
            className="ipt-txt"
          />
          <button onClick={() => {}} className="comment-submit">
            发表评论
          </button>
        </div>
        <div className="comment-emoji">
          <i className="face"></i>
          <span className="text">表情</span>
        </div>
      </div>
    </FormWraper>
  );
});
