<template>
  <div class="article-page">
    <header class="header-area">
      <el-form :inline="true">
        <el-form-item label="文章标题:">
          <span class="row-style">{{ articleDetail.detail?.title }}</span>
        </el-form-item>
        <el-form-item label="分类: ">
          <el-tag>{{ articleDetail.detail?.category?.name }} </el-tag>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag v-for="tag in articleDetail.detail?.tags" :key="tag.id">{{ tag.name }} </el-tag>
        </el-form-item>
        <el-form-item label="最近更新时间">
          <span class="row-style">{{ articleDetail.detail?.updatedAt }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main class="md-content">
      <v-md-preview-html :html="articleDetail.detail?.contentHtml"
        preview-class="vuepress-markdown-body"></v-md-preview-html>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, FormInstance, ElMessageBox } from "element-plus";
import { getArticleById } from "@/api/modules/article";

const router = useRouter();
const route = useRoute();

const articleDetail = reactive<any>({
  detail: {}
})

// 返回
const handleBack = () => {
  router.push("/blog/articles")
}

const detailDataInit = async (id: number) => {
  const aricleRes = await getArticleById({ id })
  if (Number(aricleRes.code) === 200) {
    articleDetail.detail = aricleRes?.data as any;
    console.log("articleDetail.detail:", articleDetail.detail);
  } else {
    ElMessage.error({ message: "获取文章失败!", duration: 1000 });
  }
}

onMounted(() => {
  route.query.id && detailDataInit(Number(route.query.id))
})

</script>

<style lang="scss" scoped>
.article-page {
  padding: 10px;

  .header-area {
    display: flex;
    justify-content: center;

    .row-style {
      font-size: 16px;
    }
  }

  .md-content {
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 6px 6px 2px rgba($color: #000000, $alpha: 0.1);
    box-sizing: border-box;
    height: calc(100vh - 70px);
  }
}
</style>