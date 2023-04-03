import { memo } from "react";
import { useSelector } from "react-redux";
import { ShowLoading } from "@components/ShowLoading";
import { ListWraper } from "./style";
import avatar from "@assets/images/avatar.png";

export const List = memo((props) => {
  const commentList = props.commentList || [];
  const delComment = (id) => {
    return () => {
      props.delComment && props.delComment(id);
    };
  };
  const userId = useSelector((state) => state.userInfo.userId);
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
                {item.user.id === userId && (
                  <span onClick={delComment(item.id)} className="btn-hover">
                    删除
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      <ShowLoading showLoading={props?.showLoading} />
    </ListWraper>
  );
});
