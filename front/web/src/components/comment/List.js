import { memo } from "react";
import { useSelector } from "react-redux";
import { Popconfirm } from "antd";
import { InboxOutlined } from "@ant-design/icons";
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
                  <Popconfirm
                    title="温馨提示"
                    description="您确定要删除吗?"
                    onConfirm={delComment(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <span className="btn-hover">删除</span>
                  </Popconfirm>
                )}
              </div>
            </div>
          </div>
        ))}
      {commentList.length > 0 ? (
        <ShowLoading showLoading={props?.showLoading} />
      ) : (
        <div className="list-no-data">
          <div className="content-tip">
            <InboxOutlined className="no-data-icon" />
            <span>暂无数据</span>
          </div>
        </div>
      )}
    </ListWraper>
  );
});
