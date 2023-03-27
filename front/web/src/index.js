import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
// 引入国际化配置
import { Pagination, ConfigProvider } from "antd";
// 在需要用到的 组件文件中引入中文语言包
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "@assets/css/reset.css";
import router from "@/router";
import { store } from "@store";

dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  </Provider>
);
