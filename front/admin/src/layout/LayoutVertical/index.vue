<!-- 纵向布局 -->
<template>
  <el-container class="layout">
    <el-aside>
      <div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo flx-center">
          <img src="@/assets/images/logo.jpg" alt="logo" />
          <span v-show="!isCollapse">博客后台</span>
        </div>
        <el-scrollbar>
          <el-menu :default-active="activeMenu" :router="false" :collapse="isCollapse" :collapse-transition="false"
            :unique-opened="true" background-color="#191a20" text-color="#bdbdc0" active-text-color="#ffffff">
            <SubMenu :menuList="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutVertical">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import Main from "@/layout/components/Main/index.vue";
import ToolBarLeft from "@/layout/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layout/components/Header/ToolBarRight.vue";
import SubMenu from "@/layout/components/Menu/SubMenu.vue";

const route = useRoute();
const authStore = AuthStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path)) as any;
const menuList = computed(() => authStore.showMenuListGet);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.vertical {

  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: #060708;

        &::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          content: "";
          background: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
