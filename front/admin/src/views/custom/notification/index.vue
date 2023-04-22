<template>
  <div class="rm-notification">
    <rm-notification :value="10">
      <template #default>
        <rm-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></rm-list>
      </template>
    </rm-notification>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'
import { IActionOptions, IListItem } from '@/components/list/src/stypes';
export interface IReturnDataType {
  index: Number,
  item: IActionOptions | IListItem
}
const clickItem = (data: IReturnDataType) => {
  console.log(data)
}
const clickAction = (data: IReturnDataType) => {
  console.log(data);
}
</script>

<style lang="scss" scoped>
.rm-notification {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>