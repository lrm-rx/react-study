import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { AuthState } from "@/store/interface";
import { getFlatArr } from "@/utils/util";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getShowMenuList, getAllBreadcrumbList } from "@/utils/util";

export const AuthStore = defineStore("AuthState", () => {
  // 当前页面的 router name，用来做按钮权限筛选
  const routeName = ref<AuthState["routeName"]>("");
  // 按钮权限列表
  const authButtonList = ref<AuthState["authButtonList"]>({});
  // 菜单权限列表
  const authMenuList = ref<AuthState["authMenuList"]>([]);

  // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
  const showMenuListGet = computed(() => getShowMenuList(authMenuList.value));
  // 扁平化之后的一维数组路由，主要用来添加动态路由
  const flatMenuListGet = computed(() => getFlatArr(authMenuList.value));
  // 所有面包屑导航列表
  const breadcrumbListGet = computed(() =>
    getAllBreadcrumbList(authMenuList.value)
  );

  // getAuthButtonList
  const getAuthButtonList = async () => {
    const { data } = await getAuthButtonListApi();
    authButtonList.value = data;
  };
  // getAuthMenuList
  const getAuthMenuList = async () => {
    const { data } = await getAuthMenuListApi();
    authMenuList.value = data;
  };
  // setRouteName
  const setRouteName = (name: string) => {
    routeName.value = name;
  };

  return {
    routeName,
    authButtonList,
    authMenuList,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    getAuthButtonList,
    getAuthMenuList,
    setRouteName,
  };
});
