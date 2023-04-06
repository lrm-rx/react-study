<template>
  <suspense>
    <template #default>
      <component :is="LayoutComponents[themeConfig.layout]" />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component, onMounted } from "vue"
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router"
import { GlobalStore } from "@/store"
import { TabsAndCatecoryStore } from "@/store/modules/tabsAndCatecory"
import Loading from "@/components/Loading/index.vue";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import { getUserById } from "@/api/modules/user";

const router = useRouter()
const LayoutComponents: { [key: string]: Component } = {
  vertical: defineAsyncComponent(() => import("./LayoutVertical/index.vue")),
  transverse: defineAsyncComponent(() => import("./LayoutTransverse/index.vue"))
};
const globalStore = GlobalStore()
const tabsAndCatecoryStore = TabsAndCatecoryStore();

const themeConfig = computed(() => globalStore.themeConfig);

onMounted(() => {
  getUserInfo()
  tabsAndCatecoryStore.setCatecoriesList && tabsAndCatecoryStore.setCatecoriesList();
  tabsAndCatecoryStore.setTabsList && tabsAndCatecoryStore.setTabsList();
})

const getUserInfo = async () => {
  if (globalStore.userRole && globalStore.userRole !== 1) {
    router.push("/403");
    ElNotification({
      title: "温馨提示",
      message: "您暂无权限访问博客后台!!!",
      type: "warning",
      duration: 3000
    });
    return;
  }
  if (!(globalStore.userId && globalStore.userId !== -1)) return;
  const uid = globalStore.userId;
  try {
    const userInfo = await getUserById({ id: uid })
    globalStore.setUserInfo(userInfo.data)
  } catch (error) {
    console.error(error);
  }
}

</script>

<style scoped lang="scss">
.layout {
  min-width: 760px;
}
</style>