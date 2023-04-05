import { useEffect, useLayoutEffect } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useTitle } from "@hooks";
import { getArticleDetailToUpdate } from "@service/article";
import { getUserInfoAction } from "@store/modules/userSlice";
import { getAllCategoriesAction } from "@store/modules/categorySlice";
import { getAllTagsAction } from "@store/modules/tagsSlice";
import { setArticleDetail } from "@store/modules/articleSlice";
import { setShowLoginModal } from "@store/modules/globalSlice";

// 全局路由守卫
export default function BeforeEach(props) {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const userId = useSelector((state) => state.userInfo.userId);
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (location.pathname === "/personalhomepage" ||
        location.pathname === "/article/create" ||
        location.pathname.includes("/article/update")) &&
      !isLogin
    ) {
      navigate("/home");
      dispatch(setShowLoginModal(true));
    }
  }, [location.pathname]);

  useEffect(() => {
    let articleId;
    if (params.id && location.pathname.includes("/article/detail")) {
      articleId = params.id;
    }
    if (search.get("id") && location.pathname.includes("/article/update")) {
      articleId = search.get("id");
    }
    if (articleId && isLogin) {
      getArticleDetailToUpdate(articleId)
        .then((res) => {
          if (Number(res.code) !== 200) {
            message.error({
              content: res.msg || "出错啦!",
              duration: 1,
            });
            return;
          }
          if (res.data.userId !== userId) {
            navigate("/401");
          }
          dispatch(setArticleDetail(res.data));
        })
        .catch((error) => {
          message.error({
            content: error,
            duration: 1,
          });
        });
    }
  }, [location.pathname, params, search.get("id")]);

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

  const prefix = "博客";
  useLayoutEffect(() => {
    switch (location.pathname) {
      case "/home":
        document.title = `${prefix}-首页`;
        break;
      case "/articles":
        document.title = `${prefix}-文章`;
        break;
      case "/archives":
        document.title = `${prefix}-归档`;
        break;
      case "/categories":
        document.title = `${prefix}-分类`;
        break;
      case "/tags":
        document.title = `${prefix}-标签`;
        break;

      case "/about":
        document.title = `${prefix}-关于`;
        break;
      case "/personalhomepage":
        document.title = `${prefix}-个人主页`;
        break;
      case "/article/create":
        document.title = `${prefix}-写文章`;
        break;
      default:
        document.title = `${prefix}`;
        break;
    }
  }, [location.pathname]);

  // 全局路由守卫
  return <>{props.children}</>;
}
