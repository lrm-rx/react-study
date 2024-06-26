import { App } from "vue";
import SelectIcon from "./src/index.vue";

// 让组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component("select-icon", SelectIcon);
  },
};
