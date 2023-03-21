import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.jpg";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";

const Header = memo((props) => {
  const [showLoginModal, setshowLoginModal] = useState(false);

  const handleCancel = (value) => {
    setshowLoginModal(value);
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
            className={({ isActive }) => (isActive ? "active2" : "")}
          >
            {item.title}
          </NavLink>
        ))}
        <div className="login-register">
          <div className="login" onClick={() => setshowLoginModal(true)}>
            登录
          </div>
          <span className="cross-line"></span>
          <div className="register">注册</div>
        </div>
      </div>
      {/* 登录弹窗 */}
      <LoginModal isShow={showLoginModal} cancel={handleCancel} />
    </HeaderWraper>
  );
});

export default Header;
