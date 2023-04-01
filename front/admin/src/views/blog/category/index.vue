<template>
  <div class="table-box">
    <ProTable ref="proTable" title="分类列表" :columns="columns" :requestApi="getTableList" :initParam="initParam"
      :dataCallback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-auth="'add'">新增分类</el-button>
        <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" v-auth="'batchDelete'"
          :disabled="!scope.isSelected">
          批量删除分类
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-auth="'edit'">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)" v-auth="'delete'">删除</el-button>
      </template>
    </ProTable>
    <CategoryDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="category">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Category } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import CategoryDrawer from "./CategoryDrawer.vue";
import { TabsAndCatecoryStore } from "@/store/modules/tabsAndCatecory";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getCategoryList,
  deleteCategory,
  editCategory,
  addCategory,
} from "@/api/modules/category";

const router = useRouter();
const tabsAndCatecoryStore = TabsAndCatecoryStore();


// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  tabsAndCatecoryStore.setCatecoriesList && tabsAndCatecoryStore.setCatecoriesList();
  // 可以对params的属性进行修改
  return getCategoryList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns: ColumnProps<Category.ResCategoryList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  {
    prop: "name",
    label: "分类名称",
    search: { el: "input" },
  },
  {
    prop: "createdAt",
    label: "创建时间",
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: []
    }
  }, {
    prop: "updatedAt",
    label: "更新时间",
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: []
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 删除分类信息
const deleteAccount = async (params: Category.ResCategoryList) => {
  await useHandleData(deleteCategory, { id: [params.id] }, `删除【${params.name}】分类`);
  proTable.value.getTableList();
};

// 批量删除分类信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteCategory, { id }, "删除所选分类信息");
  proTable.value.clearSelection();
  proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<Category.ResCategoryList> = {}) => {
  const params = {
    title,
    rowData: { ...rowData },
    isView: title === "查看",
    api: title === "新增" ? addCategory : title === "编辑" ? editCategory : "",
    getTableList: proTable.value.getTableList
  };
  drawerRef.value.acceptParams(params);
};
</script>