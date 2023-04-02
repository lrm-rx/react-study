import { memo } from "react";
import { ListWraper } from "./style";
import avatar from "@assets/images/avatar.png";

export const List = memo((props) => {
  const commentList = props.commentList || [];
  return (
    <ListWraper>
      {commentList.length > 0 &&
        commentList.map((item) => (
          <div className="comment-item" key={item.id}>
            <div>
              <img
                className="user-head"
                src={item.user.avatar || avatar}
                alt="头像"
              />
            </div>
            <div className="comment">
              <div className="user">{item.user.nickname}</div>
              <p className="text">{item.content}</p>
              <div className="info">
                <span className="time">{item.createdAt}</span>
                <span onClick={() => {}} className="btn-hover">
                  删除
                </span>
              </div>
            </div>
          </div>
        ))}
    </ListWraper>
  );
});
