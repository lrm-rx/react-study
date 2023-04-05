<template>
  <div class="article-page">
    <header class="header-area">
      <el-form :inline="true">
        <el-form-item label="文章标题:">
          <span class="row-style">{{ articleDetail.detail?.title }}</span>
        </el-form-item>
        <el-form-item label="分类: ">
          <el-tag round>{{ articleDetail.detail?.category?.name }} </el-tag>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag class="header-area-tag" v-for="tag in articleDetail.detail?.tags" :key="tag.id" round
            :color="tag.tagColor">{{ tag.name }}
          </el-tag>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="row-style">{{ articleDetail.detail?.createdAt }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main class="md-content">
      <v-md-preview :text="articleDetail.detail?.contentText"></v-md-preview>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
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

    .header-area-tag {
      color: #fff;
    }

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