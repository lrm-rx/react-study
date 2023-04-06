import { ref, computed } from "vue";
import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps, AssemblySizeType } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const GlobalStore = defineStore(
  "GlobalState",
  () => {
    const token = ref<GlobalState["token"]>("");
    const userInfo = ref<GlobalState["userInfo"]>(null);
    const userId = ref(-1);
    const userRole = ref(0);
    // element组件大小
    const assemblySize = ref<GlobalState["assemblySize"]>("default");
    const language = ref<GlobalState["language"]>("");
    const themeConfig = ref<GlobalState["themeConfig"]>({
      // 当前页面是否全屏
      maximize: false,
      // 布局切换 ==>  纵向：vertical | 横向：transverse
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

    // setUserRole
    const setUserRole = (payload: number) => {
      userRole.value = payload;
    };

    // setUserId
    const setUserId = (payload: number) => {
      userId.value = payload;
    };

    // setToken
    const setToken = (payload: string) => {
      token.value = payload;
    };
    // setUserInfo
    const setUserInfo = (payload: any) => {
      userInfo.value = payload;
    };
    // setAssemblySizeSize
    const setAssemblySizeSize = (payload: AssemblySizeType) => {
      assemblySize.value = payload;
    };
    // updateLanguage
    const updateLanguage = (payload: string) => {
      language.value = payload;
    };
    // setThemeConfig
    const setThemeConfig = (payload: ThemeConfigProps) => {
      themeConfig.value = payload;
    };

    return {
      userId,
      token,
      userInfo,
      userRole,
      assemblySize,
      language,
      themeConfig,
      setToken,
      setUserInfo,
      setAssemblySizeSize,
      updateLanguage,
      setThemeConfig,
      setUserId,
      setUserRole,
    };
  },
  {
    persist: piniaPersistConfig({
      key: "GlobalState",
      paths: [
        "assemblySize",
        "language",
        "themeConfig",
        "token",
        "userId",
        "userRole",
      ],
    }),
  }
);
// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
