import React from "react";
import { Spin } from "antd";
import ReactDOM from "react-dom/client";

// 当前正在请求的数量
let requestCount = 0;

// 显示loading
export function showLoading() {
  if (requestCount === 0) {
    const loadingDom = document.createElement("div");
    loadingDom.setAttribute("id", "global-loading");
    document.body.appendChild(loadingDom);
    const loadingRoot = ReactDOM.createRoot(
      document.getElementById("global-loading")
    );
    loadingRoot.render(<Spin tip="加载中..." size="large" />);
  }
  requestCount++;
}

// 隐藏loading
export function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById("global-loading"));
  }
}
