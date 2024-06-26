import { memo, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import md5 from "js-md5";
import { Button, message, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "@store/modules/userSlice";
import { setShowLoginModal } from "@store/modules/globalSlice";
import { openModal } from "@store/modules/globalSlice";
import logo from "@assets/images/logo.svg";
import { newUserRegister } from "@service/user";
import { HeaderWraper } from "./style";
import { LoginModal } from "./LoginModal";
import { RegisterModel } from "./RegisterModel";
import NicknameAvatar from "../NicknameAvatar";

const Header = memo((props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginModalRef = useRef();
  const registerModelRef = useRef();
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [disabledWriteBtn, setDisabledWriteBtn] = useState(true);
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const categories = useSelector((state) => state.categoryInfo.list);
  const tags = useSelector((state) => state.tagsInfo.list);
  const showLoginModal = useSelector(
    (state) => state.globalInfo.showLoginModal
  );
  useEffect(() => {
    if (categories?.length > 0 && tags?.length > 0) {
      setDisabledWriteBtn(false);
    }
  }, [categories, tags]);
  const dispatch = useDispatch();
  const handleUserLogin = async (data) => {
    const params = {
      ...data,
      password: md5(data?.password),
    };
    // 去调用接口
    const result = await dispatch(userLoginAction(params));
    if (result.payload) {
      loginModalRef.current.removeFormData();
    }
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(setShowLoginModal(false));
    }
  }, [isLogin]);

  const handleCancelLogin = (value) => {
    dispatch(setShowLoginModal(value));
  };
  const handleUserRegister = async (data) => {
    const registerData = {
      ...data,
      password: md5(data.password),
      repeatPassword: md5(data.repeatPassword),
    };
    const result = await newUserRegister(registerData);
    if (result.code !== 200) {
      message.error(result.msg, 2);
      return;
    }
    message.success(`用户 ${result.data.username} 注册成功!`, 2);
    setShowRegisterModal(false);
    registerModelRef.current.removeRegisterFormData();
  };
  const handleCancelRegister = (value) => {
    setShowRegisterModal(value);
  };
  // 写文章
  const clickWriteArticle = () => {
    if (!isLogin) {
      dispatch(setShowLoginModal(true));
      return;
    }
    navigate("/article/create");
  };
  const searchArticle = () => {
    dispatch(
      openModal({
        isSearchInput: true,
        open: true,
      })
    );
  };
  return (
    <HeaderWraper>
      <div
        className="logo"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/home");
        }}
      >
        <img src={logo} alt="logo" />
        博客
      </div>
      <div className="header-right">
        <div className="global-search">
          <SearchOutlined onClick={searchArticle} className="search-icon" />
        </div>
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
          <Tooltip
            title={disabledWriteBtn ? "数据未维护,请联系管理员进行维护!" : ""}
            placement="bottom"
            color="#66c4ff"
          >
            <Button
              type="primary"
              className="writing-btn"
              disabled={disabledWriteBtn}
              onClick={clickWriteArticle}
            >
              写文章
            </Button>
          </Tooltip>
          {isLogin ? (
            <NicknameAvatar />
          ) : (
            <>
              <div
                className="login"
                onClick={() => dispatch(setShowLoginModal(true))}
              >
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
        ref={loginModalRef}
      />
      {/* 注册弹窗 */}
      <RegisterModel
        isShowRegisterModal={showRegisterModal}
        cancelRegister={handleCancelRegister}
        userRegister={handleUserRegister}
        ref={registerModelRef}
      />
    </HeaderWraper>
  );
});

export default Header;
