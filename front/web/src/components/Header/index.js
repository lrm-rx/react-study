import { memo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.svg";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";
import { RegisterModel } from "./RegisterModel";

const Header = memo((props) => {
  const isLogin = false;
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCancelLogin = (value) => {
    setShowLoginModal(value);
  };
  const handleCancelRegister = (value) => {
    setShowRegisterModal(value);
  };
  // 保存并发布
  const saveAndPublish = () => {
    console.log("保存并发布");
  };

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

  return (
    <HeaderWraper>
      <div className="logo">
        <img src={logo} alt="" />
        博客
      </div>
      <div className="header-right">
        {props.headerLinks.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {item.title}
          </NavLink>
        ))}
        <div className="nav-options">
          <div
            className="writing-btn"
            onClick={() => {
              navigate("/article/writing");
            }}
          >
            写文章
          </div>
          {isLogin ? (
            <div className="nickname-avatar">
              <Dropdown dropdownRender={menuItems} placement="bottom" arrow>
                <div>
                  <span title="admin">admin</span>
                  <Avatar size={48} icon={<UserOutlined />} />
                </div>
              </Dropdown>
            </div>
          ) : (
            <>
              <div className="login" onClick={() => setShowLoginModal(true)}>
                登录
              </div>
              <span className="cross-line"></span>
              <div
                className="register"
                onClick={() => setShowRegisterModal(true)}
              >
                注册
              </div>
            </>
          )}
        </div>
      </div>
      {/* 登录弹窗 */}
      <LoginModal
        isShowLoginModal={showLoginModal}
        cancelLogin={handleCancelLogin}
      />
      {/* 注册弹窗 */}
      <RegisterModel
        isShowRegisterModal={showRegisterModal}
        cancelRegister={handleCancelRegister}
      />
    </HeaderWraper>
  );
});

export default Header;
