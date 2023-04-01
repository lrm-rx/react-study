<template>
  <div class="table-box">
    <ProTable ref="proTable" title="文章列表" :columns="columns" :requestApi="getTableList" :initParam="initParam"
      :dataCallback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-tooltip effect="light" :content="disabledWriteBtn ? '请先维护分类和标签数据!' : ''" placement="bottom">
          <el-button type="primary" :icon="CirclePlus" @click="openNewPage('add')" :disabled="disabledWriteBtn"
            v-auth="'add'">写文章</el-button>
        </el-tooltip>
        <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" v-auth="'batchDelete'"
          :disabled="!scope.isSelected">
          批量删除文章
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDetailPage(scope.row.id)">查看内容</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openNewPage('edit', scope.row.id)"
          v-auth="'edit'">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)" v-auth="'delete'">删除</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="category">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Article } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import { TabsAndCatecoryStore } from "@/store/modules/tabsAndCatecory"
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getArticleList,
  deleteArticle,
} from "@/api/modules/article";

const router = useRouter();
const tabsAndCatecoryStore = TabsAndCatecoryStore();
const disabledWriteBtn = computed(() => (tabsAndCatecoryStore.tabsList.length > 0 && tabsAndCatecoryStore.catecoriesList.length > 0) ? false : true)


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
  // 可以对params的属性进行修改
  return getArticleList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns: ColumnProps<Article.ResArticleList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  {
    prop: "title",
    label: "文章标题",
    search: { el: "input" },
  },
  {
    prop: "category.name",
    label: "所属分类",
    // search: { el: "input" }, tags
  },
  {
    prop: "tags",
    label: "标签",
    render: scope => {
      const dataList = scope.row.tags || [];
      return (
        <div>
          {dataList.map(item => {
            return (<el-tag style={{ marginRight: "4px" }} key={item.id}>{item.name}</el-tag>)
          })}
        </div>
      );
    }
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

// 删除文章信息
const deleteAccount = async (params: Article.ResArticleList) => {
  await useHandleData(deleteArticle, { id: [params.id] }, `删除【${params.title}】文章`);
  proTable.value.getTableList();
};

// 批量删除文章信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteArticle, { id }, "删除所选文章信息");
  proTable.value.clearSelection();
  proTable.value.getTableList();
};

// 跳转 新页面(新增、编辑)
const openNewPage = (tag: string, id?: number) => {
  router.push({ path: `/blog/article/${tag}`, params: { tag }, query: { id } });
};

// 跳转详情页面
const openDetailPage = (id: number) => {
  router.push({ path: "/blog/article/detail", query: { id } });
}
</script>