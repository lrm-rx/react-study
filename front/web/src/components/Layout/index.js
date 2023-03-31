import { useState, useEffect, memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FloatButton } from "antd";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "@store/modules/userSlice";
import { getAllCategoriesAction } from "@store/modules/categorySlice";
import { getAllTagsAction } from "@store/modules/tagsSlice";
import Header from "../Header";
import Footer from "../Footer";
import { headerLinks } from "@common/local-data";
import "@common/common.scss";
import { LayoutWraper } from "./style";
import { GLOBAL_HEADER_TO_TOP } from "@common/contants";
import { useViewWidth } from "@hooks/useViewWidth";
import { useScrollTop } from "@hooks/useScrollTop";

const Layout = memo(() => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const userId = useSelector((state) => state.userInfo.userId);
  const dispatch = useDispatch();
  const [fixHeaderAndFooter, setFixHeaderAndFooter] = useState(true);
  const [fixHeader, setFixHeader] = useState(false);
  const { windowWidth } = useViewWidth();
  useEffect(() => {
    if (isLogin && Number(userId) !== 0) {
      // 获取用户信息
      dispatch(getUserInfoAction(userId));
      // 获取所有的分类
      dispatch(getAllCategoriesAction());
      // 获取所有的标签
      dispatch(getAllTagsAction());
    }
  }, [isLogin, userId]);
  useEffect(() => {
    // console.log("windowWidth:", windowWidth);
  }, [windowWidth]);
  const { scrollTop } = useScrollTop();
  useEffect(() => {
    if (scrollTop >= GLOBAL_HEADER_TO_TOP) {
      setFixHeader(true);
    } else {
      setFixHeader(false);
    }
  }, [scrollTop]);

  useEffect(() => {
    if (
      location.pathname === "/articles" ||
      location.pathname.includes("/article/detail")
    ) {
      setFixHeaderAndFooter(false);
      return;
    }
    setFixHeaderAndFooter(true);
  }, [location]);
  return (
    <LayoutWraper>
      <header
        className={classnames({
          ["layout-header"]: fixHeaderAndFooter,
          ["fix-header"]: fixHeader,
        })}
      >
        <Header headerLinks={headerLinks} />
      </header>
      <main
        className={classnames({ ["main-content-area"]: fixHeaderAndFooter })}
      >
        <Outlet />
      </main>
      <footer className={classnames({ ["layout-footer"]: fixHeaderAndFooter })}>
        <Footer />
      </footer>
      <FloatButton.BackTop visibilityHeight={200} />
    </LayoutWraper>
  );
});

export default Layout;
