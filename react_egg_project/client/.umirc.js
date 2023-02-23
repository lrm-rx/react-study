import { defineConfig } from "umi";
const pxtorem = require("postcss-pxtorem");

export default defineConfig({
  // extraPostCSSPlugins: [
  //   pxtorem({
  //     rootValue: 75, //这里根据设计稿大小配置,一般是375
  //     propList: ["*"],
  //   }),
  // ],
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
      path: "/search",
      component: "./search/index",
      title: "搜索",
    },
    {
      path: "/observer",
      component: "./observer",
      title: "observer",
    },
  ],
  npmClient: "yarn",
  plugins: ["@umijs/plugins/dist/dva"],
  dva: {},
});
