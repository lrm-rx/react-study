import { computed } from "vue";
import { useRoute } from "vue-router";
import { AuthStore } from "@/store/modules/auth";

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
  const route = useRoute();
  const authStore = AuthStore();
  const authButtons = authStore.authButtonList[route.name as string] || [];

  // 当前页按钮权限列表
  const BUTTONS = computed(() => {
    let currentPageAuthButton: { [key: string]: boolean } = {};
    authButtons.forEach((item) => (currentPageAuthButton[item] = true));
    return currentPageAuthButton;
  });

  return {
    BUTTONS,
  };
};
