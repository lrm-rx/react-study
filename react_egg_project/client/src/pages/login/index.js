import React, { useState, useEffect, memo } from "react";
import { List, Form, Input, Button, Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { history } from "umi";
import { loginAction } from "@/stores/modules/user";
import "./index.less";
function Login(props) {
  let timer = null;
  const dispatch = useDispatch();
  const [state, setState] = useState();

  const onFinish = async (data) => {
    const { payload } = await dispatch(loginAction(data));
    if (payload) {
      Toast.show({
        icon: "success",
        content: "登录成功!",
        duration: 1000,
      });
      timer = setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  };

  const handleClick = () => {
    history.push("/login");
  };

  useEffect(() => {}, []);

  return (
    <div className="login-page">
      <List header="用户登录">
        <Form
          layout="horizontal"
          onFinish={onFinish}
          footer={
            <Button
              block
              type="submit"
              color="primary"
              className="submit-footer"
              size="large"
            >
              登录
            </Button>
          }
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true }, { type: "string", min: 2, max: 20 }]}
          >
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true }, { type: "string", min: 6, max: 20 }]}
          >
            <Input placeholder="请输入密码" clearable type="password" />
          </Form.Item>
        </Form>
      </List>
    </div>
  );
}

export default memo(Login);
