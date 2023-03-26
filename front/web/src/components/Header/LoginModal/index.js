import { useState, useEffect, memo } from "react";
import { Button, Modal, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { getVertifyCode } from "@service/common";
import "./index.scss";

export const LoginModal = memo((props) => {
  const [form] = Form.useForm();
  const [svgCode, setSvgCode] = useState();
  const cancel = () => {
    form.resetFields();
    props.cancelLogin && props.cancelLogin(false);
  };
  const onFinish = (values) => {
    props.userLogin && props.userLogin(values);
  };
  const handleVertifyCode = async () => {
    const code = await getVertifyCode();
    setSvgCode(code);
  };
  useEffect(() => {
    if (props.isShowLoginModal) {
      handleVertifyCode();
    }
  }, [props.isShowLoginModal]);

  return (
    <Modal
      forceRender={true}
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
        form={form}
        name="normal_login"
        className="login-form"
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
            autoComplete="off"
            className="user-login-input"
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
            className="user-login-input"
          />
        </Form.Item>

        <Form.Item
          className="form-vertify-code"
          name="vertifycode"
          rules={[
            {
              required: true,
              message: "请输入验证码!",
            },
          ]}
        >
          <>
            <Input
              prefix={<VerifiedOutlined className="site-form-item-icon" />}
              placeholder="验证码"
              size="large"
            />
            <div
              className="verity-code-area"
              dangerouslySetInnerHTML={{ __html: svgCode }}
              onClick={() => handleVertifyCode()}
            ></div>
          </>
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
