import { defineConfig } from "umi";
// const pxtorem = require("postcss-pxtorem");

export default defineConfig({
  // extraPostCSSPlugins: [
  //   pxtorem({
  //     rootValue: 75, //这里根据设计稿大小配置,一般是375
  //     propList: ["*"],
  //   }),
  // ],
  mock: false,
  proxy: {
    "/api": {
      target: "http://127.0.0.1:7001",
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: "/",
      component: "./home/index",
      title: "首页",
    },
    {
      path: "/order",
      component: "./order/index",
      title: "订单",
    },
    {
      path: "/user",
      component: "./user/index",
      title: "我的",
    },
    {
      path: "/user/edit",
      component: "./user/edit",
      title: "设置用户",
    },
    {
      path: "/search",
      component: "./search/index",
      title: "搜索",
    },
    {
      path: "/observer",
      component: "./observer",
      title: "observer",
    },
    {
      path: "/house",
      component: "./house",
      title: "房屋详情",
    },
    {
      path: "/login",
      component: "./login",
      title: "登录",
    },
    {
      path: "/register",
      component: "./register",
      title: "注册",
    },
  ],
  npmClient: "yarn",
  plugins: ["@umijs/plugins/dist/dva"],
  dva: {},
});
