import { useState, useEffect, memo } from "react";
import { Row, Col, Input, message } from "antd";
import { useSelector } from "react-redux";
import UploadAvatar from "./UploadAvatar";
import { updateUserInfo } from "@service/user";
import { useDispatch } from "react-redux";
import { refreshBasicInfo } from "@store/modules/userSlice";
import { BasicInfoWraper } from "./style";

const BasicInfo = memo(() => {
  const userInfo = useSelector((state) => state.userInfo.basicInfo);
  const dispatch = useDispatch();
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const updateNickname = async () => {
    const uid = userInfo?.id;
    const result = await updateUserInfo(uid, nickname);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      setIsEditNickname(false);
      // 刷新基本信息
      dispatch(refreshBasicInfo(result.data.info));
      return;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  };
  return (
    <BasicInfoWraper>
      <Row justify="space-around" align="middle">
        <Col span={2}>头像:</Col>
        <Col span={22}>
          <UploadAvatar userInfo={userInfo} />
        </Col>
      </Row>
      <Row justify="space-around" align="middle" className="basic-info-row">
        <Col span={2}>昵称:</Col>
        <Col span={22} className="update-nickname-col">
          {isEditNickname ? (
            <Input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              className="nickname-input"
            />
          ) : (
            <span>{userInfo?.nickname}</span>
          )}
          {isEditNickname ? (
            <>
              <span className="edit-update-nickname" onClick={updateNickname}>
                确定
              </span>
              <span
                className="edit-update-nickname cancel-update"
                onClick={() => setIsEditNickname(false)}
              >
                取消
              </span>
            </>
          ) : (
            <span
              className="edit-update-nickname"
              onClick={() => {
                setNickname(userInfo?.nickname);
                setIsEditNickname(true);
              }}
            >
              修改
            </span>
          )}
        </Col>
      </Row>
      <Row justify="space-around" align="middle" className="basic-info-row">
        <Col span={2}>用户名:</Col>
        <Col span={22}>{userInfo?.username}</Col>
      </Row>
      <Row justify="space-around" align="middle" className="basic-info-row">
        <Col span={2}>邮箱:</Col>
        <Col span={22}>{userInfo?.email}</Col>
      </Row>
      <Row justify="space-around" align="middle" className="basic-info-row">
        <Col span={2}>用户类型:</Col>
        <Col span={22}>
          {Number(userInfo?.role) === 1 ? "管理员" : "普通用户"}
        </Col>
      </Row>
    </BasicInfoWraper>
  );
});

export default BasicInfo;
