import { ref, reactive } from "vue";
import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps, AssemblySizeType } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const useGlobalStore = defineStore(
  "globalState",
  () => {
    const token = ref<GlobalState["token"]>(
      "9f44e3d8-7199-44f7-b629-2edd244c2b0c"
    );
    const userInfo = ref<GlobalState["userInfo"]>(null);
    // element组件大小
    const assemblySize = ref<GlobalState["assemblySize"]>("default");
    const language = ref<GlobalState["language"]>("");
    const themeConfig = reactive<GlobalState["themeConfig"]>({
      // 当前页面是否全屏
      maximize: false,
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true,
    });

    const changeToken = (value: string) => {
      token.value = value;
    };

    return {
      token,
      userInfo,
      assemblySize,
      language,
      themeConfig,
      changeToken,
    };
  },
  {
    persist: piniaPersistConfig({ key: "admin-global" }),
  }
);
// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
