import { memo, useState } from "react";
import { Modal, Button, Col, Form, Input, Row } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./index.scss";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 26,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const { confirm } = Modal;

const checkFormData = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (data[key]) {
        return false;
      }
      return true;
    }
  }
};

export const RegisterModel = memo((props) => {
  const [form] = Form.useForm();
  const cancelRegister = () => {
    const formData = form.getFieldsValue();
    const isEmpty = checkFormData(formData);
    if (isEmpty) {
      form.resetFields();
      props.cancelRegister(false);
      return;
    }
    confirm({
      title: "提示",
      icon: <ExclamationCircleFilled />,
      content: "确定要取消注册吗? 取消之后表单填写的内容将被清空!",
      onOk() {
        form.resetFields();
        props.cancelRegister(false);
      },
    });
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Modal
      title="注册"
      width={500}
      className="register-modal"
      keyboard={false}
      mask={false}
      maskClosable={false}
      footer={null}
      open={props.isShowRegisterModal}
      onCancel={cancelRegister}
    >
      <Form
        {...formItemLayout}
        className="register-form"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "邮箱格式不正确!",
            },
            {
              required: true,
              message: "请输入你的邮箱!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "请确认密码!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致!"));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item name="nickname" label="昵称">
          <Input size="large" />
        </Form.Item>

        <Form.Item label="邮箱验证码" extra="请输入邮箱后点击按钮获取验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="verifycode"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "请输入获取到的邮箱验证码!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button className="verify-code-button" size="large">
                获取验证码
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Button
          className="register-form-button"
          type="primary"
          size="large"
          htmlType="submit"
        >
          注册
        </Button>
      </Form>
    </Modal>
  );
});
