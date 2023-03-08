import { ref } from "vue";
import { defineStore } from "pinia";
import { keepAliveState } from "@/store/interface";

export const KeepAliveStore = defineStore("KeepAliveStore", () => {
  const keepAliveName = ref<keepAliveState["keepAliveName"]>([]);

  const addKeepAliveName = (name: string) => {
    !keepAliveName.value.includes(name) && keepAliveName.value.push(name);
  };

  const removeKeepAliveName = (name: string) => {
    keepAliveName.value = keepAliveName.value.filter(
      (item: any) => item !== name
    );
  };

  const setKeepAliveName = (payload: string[] = []) => {
    keepAliveName.value = payload;
  };

  return {
    keepAliveName,
    addKeepAliveName,
    removeKeepAliveName,
    setKeepAliveName,
  };
});
