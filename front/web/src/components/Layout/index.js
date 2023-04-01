import { useState, useEffect, memo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FloatButton, Modal, Input } from "antd";
import { SearchOutlined, InboxOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "@store/modules/userSlice";
import { getAllCategoriesAction } from "@store/modules/categorySlice";
import {
  closeModal,
  inputValChange,
  getAllArticlesAction,
} from "@store/modules/globalSlice";
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
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const userId = useSelector((state) => state.userInfo.userId);
  const globalModalInfo = useSelector((state) => state.globalInfo.modal);
  const dispatch = useDispatch();
  const [fixHeaderAndFooter, setFixHeaderAndFooter] = useState(true);
  const [fixHeader, setFixHeader] = useState(false);
  const { windowWidth } = useViewWidth();
  useEffect(() => {
    if (isLogin && Number(userId) !== 0) {
      // 获取用户信息
      dispatch(getUserInfoAction(userId));
    }
  }, [isLogin, userId]);
  useEffect(() => {
    // 获取所有的分类
    dispatch(getAllCategoriesAction());
    // 获取所有的标签
    dispatch(getAllTagsAction());
  }, []);

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

  const goAritcleDetailPage = (e) => {
    const articleId = e.target.getAttribute("data-article-id");
    if (articleId) {
      dispatch(closeModal());
      navigate(`/article/detail/${articleId}`);
    }
  };
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
      {/* 全局弹窗 */}
      <Modal
        forceRender={true}
        title={null}
        closeIcon={<></>}
        width={500}
        className="global-modal-blog"
        keyboard={false}
        mask={false}
        footer={null}
        open={globalModalInfo?.open}
        onCancel={() => dispatch(closeModal())}
      >
        <div className="global-modal-mian">
          {globalModalInfo?.isSearchInput ? (
            <Input
              onPressEnter={(e) =>
                dispatch(getAllArticlesAction(e.target.value))
              }
              value={globalModalInfo?.searchContent}
              onChange={(e) => dispatch(inputValChange(e.target.value))}
              placeholder="请输入关键词并按回车搜索!"
              prefix={<SearchOutlined />}
            />
          ) : (
            <div className="global-search-article">技术(18)</div>
          )}
          <ul
            className="global-search-article-ul global-scrollbar-style"
            onClick={goAritcleDetailPage}
          >
            {globalModalInfo?.contentList?.length > 0 ? (
              globalModalInfo?.contentList?.map((item) => (
                <li
                  data-article-id={item.id}
                  key={item.id}
                  className="text-nowrap"
                >
                  {item.title}
                </li>
              ))
            ) : (
              <div className="list-no-data">
                <div className="content-tip">
                  <InboxOutlined className="no-data-icon" />
                  <span>暂无数据</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </Modal>
    </LayoutWraper>
  );
});

export default Layout;
