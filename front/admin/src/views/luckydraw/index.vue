<template>
  <div class="table-box card">
    <LuckyDraw @start="start" @animationOver="animationOver" :id="prizeId" />
  </div>
</template>

<script lang="ts" setup>
import LuckyDraw from '@/components/luckydraw/index.vue'
import { ref } from 'vue'
const prizeId = ref<number | string>('') //奖品id,后端获取
const start = async () => {
  prizeId.value = ''
  //请求获取中奖id
  setTimeout(() => {
    prizeId.value = 3
  })

}

//动画结束 处理对应弹窗
const animationOver = (id: number) => {
  alert(`中奖id:${id}`)
}
</script>
<style lang="scss" scoped></style>