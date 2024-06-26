import React, { useState, useEffect, memo } from "react";
import { TextArea, Button, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/components";
import { useLocation } from "umi";
import { urlStrToObj } from "@/utils";
import { getAddCommentAction } from "@/stores/modules/house";

function Footer(props) {
  const { search } = useLocation();
  const query = urlStrToObj(search);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [commentsValue, setCommentsValue] = useState();

  const handleSubmit = () => {
    if (commentsValue.trim()) {
      handleClose();
      dispatch(
        getAddCommentAction({
          comment: commentsValue,
          houseId: query?.id,
        })
      );
    } else {
      Toast.show({
        icon: "fail",
        content: "请添加评论内容!",
      });
    }
  };

  useEffect(() => {}, []);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="footer">
      <div className="footer-content" onClick={handleClick}>
        评论
      </div>
      <Modal
        show={show}
        styleBody={{
          height: "220px",
          bottom: "0px",
          top: "unset",
        }}
        onClose={handleClose}
      >
        <div className="modal-comment">
          <TextArea
            placeholder="请输入内容"
            rows={2}
            maxLength={200}
            showCount={200}
            onChange={(v) => {
              setCommentsValue(v);
            }}
          />
          <Button
            onClick={handleSubmit}
            className="comment-btn"
            color="warning"
          >
            评论
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default memo(Footer);
