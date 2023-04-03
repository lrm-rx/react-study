import { useRef, memo, forwardRef, useImperativeHandle } from "react";
import { Count } from "./Count";
import { Form } from "./Form";
import { List } from "./List";
import { CommentWraper } from "./style";

export const Comment = memo(
  forwardRef((props, ref) => {
    const commentList = props.commentList || [];
    const total = props.total || 0;
    return (
      <CommentWraper>
        <div className="comment-container">
          {/* 评论数 */}
          <Count total={total} />

          {/* 发表评论区 */}
          <Form addComment={props.addComment} ref={ref} />

          {/* 评论列表区 */}
          <List
            commentList={commentList}
            delComment={props.delComment}
            showLoading={props?.showLoading}
          />
        </div>
      </CommentWraper>
    );
  })
);
