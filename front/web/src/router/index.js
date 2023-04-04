import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";

const BeforeEach = lazy(() => import("@components/BeforeEach"));
const Layout = lazy(() => import("@components/Layout"));
const Home = lazy(() => import("@views/Home"));
const Article = lazy(() => import("@views/Article"));
const ArticleDetail = lazy(() => import("@views/Article/Detail"));
const WriteArticle = lazy(() => import("@views/Article/Write"));
const Pigeonhole = lazy(() => import("@views/Pigeonhole"));
const Category = lazy(() => import("@views/Classification"));
const ArticleTag = lazy(() => import("@views/Tag"));
const About = lazy(() => import("@views/About"));
const PersonalPage = lazy(() => import("@views/PersonalPage"));
const NoAuth = lazy(() => import("../views/NoAuth"));
const NotFound = lazy(() => import("../views/NotFound"));

const lazyLoad = (children) => {
  return (
    <Suspense
      fallback={
        <Spin
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size="large"
        />
      }
    >
      {children}
    </Suspense>
  );
};

export const routes = [
  {
    path: "/",
    element: lazyLoad(<Navigate to="/home" />),
  },
  {
    path: "/",
    name: "layout",
    element: lazyLoad(
      <BeforeEach>
        <Layout />
      </BeforeEach>
    ),
    children: [
      {
        path: "home",
        name: "home",
        element: lazyLoad(<Home />),
      },
      {
        path: "articles",
        name: "articles",
        element: lazyLoad(<Article />),
      },
      {
        path: "archives",
        name: "archives",
        element: lazyLoad(<Pigeonhole />),
      },
      {
        path: "categories",
        name: "categories",
        element: lazyLoad(<Category />),
      },
      {
        path: "tags",
        name: "tags",
        element: lazyLoad(<ArticleTag />),
      },
      {
        path: "about",
        name: "about",
        element: lazyLoad(<About />),
      },
      {
        path: "article/detail/:id",
        name: "detail",
        element: lazyLoad(<ArticleDetail />),
      },
      {
        path: "personalhomepage",
        name: "personalhomepage",
        element: lazyLoad(<PersonalPage />),
      },
    ],
  },
  {
    path: "/article/:type", // type: create添加, update: 更新
    name: "writing",
    element: lazyLoad(
      <BeforeEach>
        <WriteArticle />
      </BeforeEach>
    ),
    // loader: async () => {
    //   // 局部路由守卫
    //   return null;
    // },
  },
  {
    path: "/401",
    element: lazyLoad(<NoAuth />),
  },
  {
    path: "/404",
    element: lazyLoad(<NotFound />),
  },
  {
    path: "*",
    element: lazyLoad(<Navigate to="/404" />),
  },
];

const router = createBrowserRouter(routes);

export default router;
