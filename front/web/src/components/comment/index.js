import { memo } from "react";
import { Count } from "./Count";
import { Form } from "./Form";
import { List } from "./List";
import { CommentWraper } from "./style";

export const Comment = memo(() => {
  return (
    <CommentWraper>
      <div className="comment-container">
        {/* 评论数 */}
        <Count />

        {/* 发表评论区 */}
        <Form />

        {/* 评论列表区 */}
        <List />
      </div>
    </CommentWraper>
  );
});
