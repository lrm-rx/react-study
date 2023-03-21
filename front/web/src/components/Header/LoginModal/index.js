import { memo, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import "./index.scss";

export const LoginModal = memo((props) => {
  const [form] = Form.useForm();
  const cancel = () => {
    form.resetFields();
    props.cancelLogin(false);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Modal
      title="登录"
      width={500}
      className="login-modal"
      keyboard={false}
      mask={false}
      maskClosable={false}
      footer={null}
      open={props.isShowLoginModal}
      onCancel={cancel}
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
              message: "请输入用户名!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            size="large"
          />
        </Form.Item>

        <Form.Item
          className="form-verity-code"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入验证码!",
            },
          ]}
        >
          <Input
            prefix={<VerifiedOutlined className="site-form-item-icon" />}
            placeholder="验证码"
            size="large"
          />
          <div className="verity-code-area">验证码</div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});
