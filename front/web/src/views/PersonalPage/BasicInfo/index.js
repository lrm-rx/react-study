import { useState, useEffect, memo } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import UploadAvatar from "./UploadAvatar";
import { BasicInfoWraper } from "./style";

const BasicInfo = memo(() => {
  const userInfo = useSelector((state) => state.userInfo.basicInfo);
  return (
    <BasicInfoWraper>
      <Row justify="space-around" align="middle">
        <Col span={2}>头像:</Col>
        <Col span={22}>
          <UploadAvatar userInfo={userInfo} />
        </Col>
      </Row>
    </BasicInfoWraper>
  );
});

export default BasicInfo;
