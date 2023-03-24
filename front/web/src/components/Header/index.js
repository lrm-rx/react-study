import { memo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";
import { RegisterModel } from "./RegisterModel";
import NicknameAvatar from "../NicknameAvatar";

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
