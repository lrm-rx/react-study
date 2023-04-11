import {
  useState,
  useEffect,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { getVertifyCode } from "@service/common";
import "./index.scss";

export const LoginModal = memo(
  forwardRef((props, ref) => {
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

    useImperativeHandle(
      ref,
      () => ({
        removeFormData: () => {
          form.resetFields();
        },
      }),
      []
    );

    return (
      <Modal
        forceRender={true}
        title="登录"
        width={500}
        centered="true"
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
            name="loginname"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名/邮箱"
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
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={8}>
              <Col span={17}>
                <Form.Item
                  name="veritycode"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <VerifiedOutlined className="site-form-item-icon" />
                    }
                    placeholder="验证码"
                    autoComplete="off"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <div
                  className="verity-code-area"
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                  onClick={() => handleVertifyCode()}
                ></div>
              </Col>
            </Row>
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
  })
);
