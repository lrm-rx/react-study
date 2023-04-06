import { ref } from "vue";
import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/store/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/router/index";

export const TabsStore = defineStore(
  "TabsState",
  () => {
    const tabsMenuList = ref<TabsState["tabsMenuList"]>([]);

    const addTabs = (tabItem: TabsMenuProps) => {
      if (tabsMenuList.value.every((item) => item.path !== tabItem.path)) {
        tabsMenuList.value.push(tabItem);
      }
    };

    const removeTabs = (tabPath: string, isCurrent: boolean = true) => {
      if (isCurrent) {
        tabsMenuList.value.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab =
            tabsMenuList.value[index + 1] || tabsMenuList.value[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      tabsMenuList.value = tabsMenuList.value.filter(
        (item) => item.path !== tabPath
      );
    };

    const closeMultipleTab = (tabsMenuValue?: string) => {
      tabsMenuList.value = tabsMenuList.value.filter((item) => {
        return item.path === tabsMenuValue || !item.close;
      });
    };

    const setTabs = (payload: TabsMenuProps[]) => {
      tabsMenuList.value = payload;
    };

    const setTabsTitle = (title: string) => {
      const nowFullPath = location.hash.substring(1);
      tabsMenuList.value.forEach((item) => {
        if (item.path == nowFullPath) item.title = title;
      });
    };

    return {
      tabsMenuList,
      addTabs,
      removeTabs,
      closeMultipleTab,
      setTabs,
      setTabsTitle,
    };
  },
  {
    persist: piniaPersistConfig({ key: "TabsState" }),
  }
);
