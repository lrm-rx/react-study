import React, { useState, useEffect, memo } from "react";
import { List, Form, Input, Button, Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { history } from "umi";
import { registerAction, logoutAction } from "@/stores/modules/user";
import "./index.less";
function Register(props) {
  let timer = null;
  const dispatch = useDispatch();
  const [state, setState] = useState();

  const onFinish = (data) => {
    if (data.repassword !== data.password) {
      return Toast.show({
        icon: "fail",
        content: "两次输入的密码不一致!",
      });
    }
    dispatch(registerAction(data));
    timer = setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  const handleClick = () => {
    history.push("/login");
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="register-page">
      <List header="用户注册">
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
              注册
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
            <Input placeholder="请输入密码" clearable />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="repassword"
            rules={[{ required: true }, { type: "string", min: 6, max: 20 }]}
          >
            <Input placeholder="请再交输入密码" clearable />
          </Form.Item>
        </Form>
      </List>
      <div className="login" onClick={handleClick}>
        已有账户，去登录
      </div>
    </div>
  );
}

export default memo(Register);
