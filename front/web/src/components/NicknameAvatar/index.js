import { useState, memo } from "react";
import {
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Button,
  Space,
  Form,
  Input,
  message,
} from "antd";
import md5 from "js-md5";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "@service/user";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "@store/modules/userSlice";
import { UserOutlined } from "@ant-design/icons";
import { USER_PASSWORD_REG } from "@common/contants";
import { NicknameAvatarWraper } from "./style";
import { userUpdatePasswordAction } from "@store/modules/userSlice";
import "./style.scss";

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

const NicknameAvatar = memo(() => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.userInfo.basicInfo?.nickname);
  const avatar = useSelector((state) => state.userInfo.basicInfo?.avatar);
  const dispatch = useDispatch();
  const [showUpdatePasswordModel, setShowUpdatePasswordModel] = useState(false);
  const confirmUpdatePassword = async (values) => {
    const data = {
      oldPassword: md5(values.oldPassword),
      newPassword: md5(values.newPassword),
      repeatNewPassword: md5(values.repeatNewPassword),
    };
    // dispatch(userUpdatePasswordAction(data));
    const result = await updatePassword(data);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      form.resetFields();
      setShowUpdatePasswordModel(false);
      return;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  };
  const logout = () => {
    const clearDate = {
      userId: 0,
      token: "",
      isLogin: false,
    };
    dispatch(userLogoutAction());
  };
  // Dropdown Menu
  const menuItems = () => (
    <Menu
      className="nickname-dropdown-menu"
      items={[
        {
          key: "1",
          label: <span className="dropdown-item">个人主页</span>,
          onClick: () => navigate(`/personalhomepage`),
        },
        {
          key: "2",
          label: <span className="dropdown-item">修改密码</span>,
          onClick: () => setShowUpdatePasswordModel(true),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: <span className="dropdown-item">退出登录</span>,
          onClick: logout,
        },
      ]}
    ></Menu>
  );

  return (
    <NicknameAvatarWraper>
      <Dropdown
        dropdownRender={menuItems}
        overlayClassName="nickname-avatar-dropdown"
        placement="bottom"
        arrow
      >
        <div>
          <span className="right-nickname" title="admin">
            {nickname}
          </span>
          <Avatar src={avatar} size={48} icon={<UserOutlined />} />
        </div>
      </Dropdown>
      {/* 修改密码 */}
      <Modal
        forceRender={true}
        title="修改密码"
        width={500}
        centered="true"
        className="updatepassword-modal"
        keyboard={false}
        mask={false}
        maskClosable={false}
        footer={null}
        open={showUpdatePasswordModel}
        onCancel={() => {
          setShowUpdatePasswordModel(false);
          form.resetFields();
        }}
      >
        <Form
          {...formItemLayout}
          className="updatepassword-form"
          form={form}
          onFinish={confirmUpdatePassword}
          name="updatepassword"
        >
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[
              {
                required: true,
                message: "请输入原密码!",
              },
            ]}
          >
            <Input.Password
              autoComplete="off"
              className="updatepassword-input"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value?.trim()) {
                    return Promise.reject(new Error("请输入新密码!"));
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
            <Input.Password
              autoComplete="off"
              className="updatepassword-input"
            />
          </Form.Item>

          <Form.Item
            name="repeatNewPassword"
            label="确认密码"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "请确认密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致!"));
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="off"
              className="updatepassword-input"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className="updatepassword-form-options">
              <Button
                className="cancelupdate-form-button"
                size="large"
                onClick={() => {
                  setShowUpdatePasswordModel(false);
                  form.resetFields();
                }}
              >
                取消
              </Button>
              <Button
                className="updatepassword-form-button"
                type="primary"
                size="large"
                htmlType="submit"
              >
                确认
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </NicknameAvatarWraper>
  );
});

export default NicknameAvatar;
