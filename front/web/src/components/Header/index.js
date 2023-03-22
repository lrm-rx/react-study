import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";
import { RegisterModel } from "./RegisterModel";

const Header = memo((props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCancelLogin = (value) => {
    setShowLoginModal(value);
  };
  const handleCancelRegister = (value) => {
    setShowRegisterModal(value);
  };
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
        <div className="login-register">
          <div className="login" onClick={() => setShowLoginModal(true)}>
            登录
          </div>
          <span className="cross-line"></span>
          <div className="register" onClick={() => setShowRegisterModal(true)}>
            注册
          </div>
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
