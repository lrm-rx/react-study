import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { loadPlugins } from "@/plugins";

// css
import "normalize.css";
import "@/styles/reset.scss";
import "@/styles/common.scss";
import "@/assets/iconfont/iconfont.scss";
import "@/assets/fonts/font.scss";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/theme/element-dark.scss";
import "@/styles/element.scss";

import I18n from "@/languages/index";
// pinia store
import pinia from "@/store";
// custom directives
import directives from "@/directives/index";
// errorHandler
import errorHandler from "@/utils/errorHandler";

const app = createApp(App);
app.config.errorHandler = errorHandler;
// 加载插件
loadPlugins(app);

app.use(router).use(I18n).use(pinia).use(directives).mount("#app");
