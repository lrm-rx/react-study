import { ref } from "vue";
import { defineStore } from "pinia";
import { getAllCategory } from "@/api/modules/category";
import { getAllTag } from "@/api/modules/tag";

export const TabsAndCatecoryStore = defineStore("tabsAndCatecoryStore", () => {
  const tabsList = ref([]);
  const catecoriesList = ref([]);

  const setTabsList = async () => {
    const result = await getAllTag();
    if (Number(result.code) === 200) {
      tabsList.value = result.data as any;
    }
  };

  const setCatecoriesList = async () => {
    const result = await getAllCategory();
    if (Number(result.code) === 200) {
      catecoriesList.value = result.data as any;
    }
  };
  return {
    tabsList,
    setTabsList,
    catecoriesList,
    setCatecoriesList,
  };
});
