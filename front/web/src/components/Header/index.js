import { memo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDebounceFn } from "ahooks";
import logo from "@assets/images/logo.svg";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";
import { RegisterModel } from "./RegisterModel";
import NicknameAvatar from "../NicknameAvatar";
import { Button } from "antd";

const Header = memo((props) => {
  const isLogin = false;
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [count, setCount] = useState(0);
  const { run: handleClick } = useDebounceFn(
    () => {
      setCount(count + 1);
    },
    {
      wait: 500,
    }
  );
  const handleUserLogin = (data) => {
    console.log("data:", data);
  };
  const handleCancelLogin = (value) => {
    setShowLoginModal(value);
  };
  const handleUserRegister = (data) => {
    console.log("注册:", data);
  };
  const handleCancelRegister = (value) => {
    setShowRegisterModal(value);
  };
  return (
    <HeaderWraper>
      <div className="logo">
        <img src={logo} alt="logo" />
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
            <NicknameAvatar />
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
        userLogin={handleUserLogin}
      />
      {/* 注册弹窗 */}
      <RegisterModel
        isShowRegisterModal={showRegisterModal}
        cancelRegister={handleCancelRegister}
        userRegister={handleUserRegister}
      />
    </HeaderWraper>
  );
});

export default Header;
