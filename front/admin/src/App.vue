<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn"
</script>

<style scoped></style>
