import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "@hooks";

export default function BeforeEach(props) {
  const location = useLocation();
  const prefix = "博客";
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
    default:
      document.title = `${prefix}-详情`;
      break;
  }
  // 全局路由守卫
  return <>{props.children}</>;
}
