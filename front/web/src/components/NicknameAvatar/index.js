import { memo } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NicknameAvatarWraper } from "./style";

// Dropdown Menu
const menuItems = () => (
  <Menu
    items={[
      {
        key: "1",
        label: <span className="dropdown-item">个人中心</span>,
        onClick: () => {},
      },
      {
        key: "2",
        label: <span className="dropdown-item">修改密码</span>,
        onClick: () => {},
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: <span className="dropdown-item">退出登录</span>,
        onClick: () => {
          alert("退出");
        },
      },
    ]}
  ></Menu>
);

const NicknameAvatar = memo(() => {
  return (
    <NicknameAvatarWraper>
      <Dropdown dropdownRender={menuItems} placement="bottom" arrow>
        <div>
          <span className="right-nickname" title="admin">
            admin
          </span>
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </NicknameAvatarWraper>
  );
});

export default NicknameAvatar;
