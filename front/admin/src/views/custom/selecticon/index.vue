<template>
  <div class="table-box card">
    <select-icon title="选择图标" v-model:visible="visible">选择图标</select-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let visible = ref<boolean>(false)
</script>

<style lang="scss" scoped></style>