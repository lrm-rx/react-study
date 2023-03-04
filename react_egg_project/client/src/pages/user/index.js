import React, { useState, useEffect } from "react";
import { List, Button } from "antd-mobile";
import {
  FileOutline,
  QuestionCircleOutline,
  PhonebookOutline,
  SetOutline,
} from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";
import { history } from "umi";
import { ErrorBoundary } from "@/components";
import { getUserDetailAction, logoutAction } from "@/stores/modules/user";
import "./index.less";

export default function (props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.info);
  const [state, setState] = useState();

  const handleClick = (id) => {
    history.push({
      pathname: "/user/edit",
      search: `?id=${id}`,
    });
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    dispatch(getUserDetailAction({ id: 10 }));
  }, []);

  return (
    <ErrorBoundary>
      <div className="user-page">
        {/**用户信息 */}
        <div className="info">
          <div className="user">
            <img
              alt="user"
              src={userInfo?.avatar || require("../../assets/yay.jpg")}
            />
            <div className="tel">{userInfo?.tel}</div>
            <div className="sign">{userInfo?.sign}</div>
          </div>
        </div>
        {/**列表 */}
        <div className="lists">
          <List>
            <List.Item prefix={<FileOutline />} onClick={() => {}}>
              用户协议
            </List.Item>
            <List.Item prefix={<QuestionCircleOutline />} onClick={() => {}}>
              常见问题
            </List.Item>
            <List.Item prefix={<PhonebookOutline />} onClick={() => {}}>
              联系客服
            </List.Item>
            <List.Item prefix={<SetOutline />} onClick={() => handleClick(10)}>
              设置
            </List.Item>
          </List>
        </div>
        <div className="logout">
          <Button
            style={{ marginTop: "100px" }}
            color="primary"
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
