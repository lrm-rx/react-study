import {
  useEffect,
  useState,
  memo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, Button, Col, Space, Form, Input, Row, message } from "antd";
import _ from "lodash-es";
import { checkUserName, checkEmail, sendEmail } from "@service/common";
import { debounce, checkFormData, objToArray, handleTrim } from "@utils/common";
import { USER_NAME_REG, USER_PASSWORD_REG, USER_EMAIL } from "@common/contants";
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
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};
const { confirm } = Modal;

export const RegisterModel = memo(
  forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [codeBtnText, setCodeBtnText] = useState("获取验证码");
    const [checkVerifycode, setCheckVerifycode] = useState(true);
    const [codeBtnDisabled, setCodeBtnDisabled] = useState(false);
    const timeoutRef = useRef(null);
    const clickVerityCode = async () => {
      try {
        (codeBtnText === "获取验证码" || codeBtnText === "再次发送") &&
          setCheckVerifycode(false);
        let num = 60;
        timeoutRef.current = null;
        // validateFields 自带拦截
        form.validateFields();
        const { username, email } = form.getFieldsValue();
        if (!username?.trim() || !email?.trim()) return;
        const result = await sendEmail({ username, email });
        if (result.code !== 200) {
          message.error(result.msg, 2);
          return;
        }
        message.success("邮件发送成功!", 2);
        setCheckVerifycode(true);
        (function decrement() {
          if (num <= 0) {
            setCodeBtnText("再次发送");
            setCodeBtnDisabled(false);
            clearTimeout(timeoutRef.current);
            return;
          }
          setCodeBtnDisabled(true);
          setCodeBtnText(`${num}S后再次发送`);
          num--;
          timeoutRef.current = setTimeout(decrement, 1000);
        })();
      } catch (error) {
        console.log("error", error);
      }
    };
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
          setCodeBtnText("获取验证码");
          form.resetFields();
          props.cancelRegister && props.cancelRegister(false);
        },
      });
    };
    const formSubmit = () => {
      // 触发校验
      form.submit();
      const values = form.getFieldsValue();
      const formData = _.omit(values, ["nickname"]);
      const clearDataTrim = handleTrim(formData);
      const isHasEmpty = Object.values(clearDataTrim).some((item) => !item);
      if (isHasEmpty) return;
      clearTimeout(timeoutRef.current);
      setCodeBtnDisabled(false);
      setCodeBtnText("获取验证码");
      props.userRegister && props.userRegister(values);
    };

    const check_username = (username) => {
      return new Promise((resolve, reject) => {
        checkUserName({ username })
          .then((result) => {
            if (result.code !== 200) {
              resolve(result);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const validatorUsername = async (rule, value, callback) => {
      try {
        if (!value?.trim()) {
          throw new Error("请输入用户名!");
        }
        if (value?.trim() && USER_NAME_REG.test(value)) {
          const result = await check_username(value);
          if (result.code === 403) {
            throw new Error(result.msg);
          }
          callback();
        }
        throw new Error("含英文/数字/汉字/字符(_.-)且长度在2-20之间!");
      } catch (err) {
        callback(err);
      }
    };

    const checkE_mail = (email) => {
      return new Promise((resolve, reject) => {
        checkEmail({ email })
          .then((result) => {
            if (result.code !== 200) {
              resolve(result);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const validatorEmail = async (rule, value, callback) => {
      try {
        if (value?.trim() && USER_EMAIL.test(value)) {
          const result = await checkE_mail(value);
          if (result.code === 403) {
            throw new Error(result.msg);
          }
          callback();
        }
        callback();
      } catch (err) {
        callback(err);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        removeRegisterFormData: () => {
          form.resetFields();
        },
      }),
      []
    );

    return (
      <Modal
        forceRender={true}
        title="注册"
        width={500}
        centered="true"
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
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                validator: debounce(validatorUsername),
              },
            ]}
          >
            <Input className="register-input" autoComplete="off" />
          </Form.Item>
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
              {
                validator: debounce(validatorEmail),
              },
            ]}
          >
            <Input className="register-input" autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value?.trim()) {
                    return Promise.reject(new Error("请输入密码!"));
                  }
                  if (value?.trim() && !USER_PASSWORD_REG.test(value)) {
                    return Promise.reject(
                      new Error("包含英文和数字或字符(!@#_.)且长度在6-20之间!")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password autoComplete="off" className="register-input" />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
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
            <Input.Password autoComplete="off" className="register-input" />
          </Form.Item>

          <Form.Item name="nickname" label="昵称">
            <Input className="register-input" autoComplete="off" />
          </Form.Item>

          <Form.Item label="邮箱验证码" extra="请填写表单后点击按钮获取验证码">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="verifycode"
                  noStyle
                  rules={[
                    {
                      required: checkVerifycode,
                      message: "请输入邮箱验证码!",
                    },
                  ]}
                >
                  <Input className="register-input" autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  disabled={codeBtnDisabled}
                  onClick={clickVerityCode}
                  className="verify-code-button"
                >
                  {codeBtnText}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className="register-form-options">
              <Button
                className="reset-form-button"
                size="large"
                onClick={() => {
                  form.resetFields();
                  setCheckVerifycode(true);
                }}
              >
                重置
              </Button>
              <Button
                className="register-form-button"
                type="primary"
                size="large"
                onClick={formSubmit}
              >
                注册
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  })
);
