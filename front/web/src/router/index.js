import React, { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";

const BeforeEach = lazy(() => import("@/components/BeforeEach"));
const Layout = lazy(() => import("@/components/Layout"));
const Home = lazy(() => import("@/views/Home"));
const Article = lazy(() => import("@/views/Article"));
const Pigeonhole = lazy(() => import("@/views/Pigeonhole"));
const Category = lazy(() => import("@/views/Classification"));
const Tag = lazy(() => import("@/views/Tag"));
const About = lazy(() => import("@/views/About"));

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
        path: "article",
        name: "article",
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
        element: lazyLoad(<Tag />),
      },
      {
        path: "about",
        name: "about",
        element: lazyLoad(<About />),
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
