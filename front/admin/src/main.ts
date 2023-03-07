import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { loadPlugins } from "@/plugins";

// css
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);
// 加载插件
loadPlugins(app);

app.use(router).mount("#app");
