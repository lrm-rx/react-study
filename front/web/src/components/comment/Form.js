import {
  useState,
  memo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { FormWraper } from "./style";
import avatar from "@assets/images/avatar.png";
import { articleComent } from "@views/Article/Detail";

export const Form = memo(
  forwardRef((props, ref) => {
    const avatarUrl = useSelector((state) => state.userInfo.basicInfo?.avatar);
    // 使用上下文，因为传入的是对象，则接受也应该是对象
    // const { addComment } = useContext(articleComent);
    const formRef = useRef();
    const [commentText, setCommentText] = useState("");
    const commentSubmit = () => {
      props.addComment && props.addComment(commentText);
    };
    useImperativeHandle(
      ref,
      () => ({
        removeCommentText: () => {
          setCommentText("");
        },
        currentDOM: () => formRef.current,
      }),
      [formRef.current]
    );
    return (
      <FormWraper ref={formRef}>
        <div>
          <img className="user-head" src={avatarUrl || avatar} alt="头像" />
        </div>
        <div className="comment-send">
          <div className="textarea-container">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              cols="80"
              rows="5"
              placeholder="发条友善的评论吧!"
              className="ipt-txt"
            />
            <button onClick={commentSubmit} className="comment-submit">
              发表评论
            </button>
          </div>
        </div>
      </FormWraper>
    );
  })
);
