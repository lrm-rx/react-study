import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import VMdEditor from "@kangc/v-md-editor";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import { loadPlugins } from "@/plugins";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

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
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/style/preview-html.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import I18n from "@/languages/index";
// pinia store
import pinia from "@/store";
// custom directives
import directives from "@/directives/index";
// errorHandler
import errorHandler from "@/utils/errorHandler";

// Prism
import Prism from "prismjs";
// highlight code
import "prismjs/components/prism-json";
import { toLine } from "./utils/index";
import RmUI from "./components/custom";
import "./mock";

VMdEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
app.config.errorHandler = errorHandler;
// 加载插件
loadPlugins(app);

// el-icon-xxx
for (const i in ElementPlusIconsVue) {
  if (Object.prototype.hasOwnProperty.call(ElementPlusIconsVue, i)) {
    // 注册全部组件
    app.component(`el-icon-${toLine(i)}`, (ElementPlusIconsVue as any)[i]);
  }
}

app
  .use(router)
  .use(I18n)
  .use(pinia)
  .use(directives)
  .use(VMdEditor)
  .use(VMdPreview)
  .use(RmUI)
  .mount("#app");
