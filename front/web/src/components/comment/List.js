import { memo } from "react";
import { ListWraper } from "./style";
import avatar from "@assets/images/avatar.png";

export const List = memo(() => {
  return (
    <ListWraper>
      <div className="comment-item">
        <div>
          <img className="user-head" src={avatar} alt="头像" />
        </div>

        <div className="comment">
          <div className="user">作者</div>
          <p className="text">评论</p>
          <div className="info">
            <span className="time">时间</span>
            <span onClick={() => {}} className="btn-hover">
              删除
            </span>
          </div>
        </div>
      </div>
    </ListWraper>
  );
});
