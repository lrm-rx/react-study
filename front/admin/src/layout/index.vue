<template>
  <suspense>
    <template #default>
      <!-- <component :is="LayoutComponents[themeConfig.layout]" /> -->
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component, onMounted } from "vue"
import { GlobalStore } from "@/store"
import Loading from "@/components/Loading/index.vue";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";

// const LayoutComponents: { [key: string]: Component } = {
//   vertical: defineAsyncComponent(() => import("./LayoutVertical/index.vue")),
//   transverse: defineAsyncComponent(() => import("./LayoutTransverse/index.vue"))
// };
const globalStore = GlobalStore()

const themeConfig = computed(() => globalStore.themeConfig);

</script>

<style scoped lang="scss">
.layout {
  min-width: 760px;
}
</style>