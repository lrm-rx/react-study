import { memo, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const LoginModal = memo((props) => {
  const cancelLogin = () => {
    props.cancel(false);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Modal
      title="登录"
      keyboard={false}
      mask={false}
      maskClosable={false}
      footer={null}
      open={props.isShow}
      onCancel={cancelLogin}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});
