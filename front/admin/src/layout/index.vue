<template>
  <div>
    <p>name: {{ obj.name }}</p>
    <p>age: {{ obj.age }}</p>
    <button @click="changeName">修改name</button>
    <button @click="changeAge">修改age</button>
    <button @click="changeAll">一起修改</button>
    <div>ref: {{ num }}</div>
    <button @click="changeNum">加2</button>
    <div>从store中取的token: {{ globalStore.token }}</div>
    <button @click="changeInfo">修改token</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { useGlobalStore } from "@/store"
const globalStore = useGlobalStore()
const changeInfo = () => {
  const num = Math.random() * 100 + ""
  globalStore.changeToken(num)
}
const num = ref(0)
const changeNum = () => {
  num.value = num.value + 2
}
const obj = reactive({
  name: "小明",
  age: 18
})
const changeName = () => {
  if (obj.name === "小朋") {
    obj.name = "小明"
    return
  }
  obj.name = "小朋"
}

const changeAge = () => {
  obj.age = obj.age + 1
}
const changeAll = () => {
  if (obj.name === "小朋") {
    obj.name = "小明"
    return
  }
  obj.name = "小朋"
  obj.age = obj.age + 1
}
</script>

<style scoped lang="scss">
.layout {
  min-width: 760px;
}
</style>