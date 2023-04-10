<template>
  <div class="article-page">
    <header class="header-area">
      <el-form :inline="true" :model="formData" :rules="rules" ref="formRef">
        <el-form-item label="文章标题" prop="title">
          <el-input @change="handleChnage" v-model="formData.title" placeholder="请输入" class="article-title" />
        </el-form-item>
        <el-form-item label="文章封面" prop="coverImage">
          <el-upload accept=".png,.jpg,.jpeg,.gif" :before-upload="beforeUpload" :show-file-list="false" :limit="1">
            <template #trigger>
              <el-tooltip class="box-item" effect="light" content="图片大小不能大于2M!" placement="bottom">
                <el-button type="primary">选择封面</el-button>
              </el-tooltip>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="formData.categoryId" @change="handleChnage" placeholder="请选择">
            <el-option v-for="item in categoryData" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tagIds">
          <el-select @change="handleChnage" v-model="formData.tagIds" multiple collapse-tags collapse-tags-tooltip
            :max-collapse-tags="2" placeholder="请选择" style="width: 240px">
            <el-option v-for="item in tagData" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit" :disabled="!formData.contentText.trim()">发布</el-button>
          <el-button type="primary" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main class="md-content">
      <v-md-editor v-model="mdText" @change="handleMdChnage" @save="handleSave" height="100%"></v-md-editor>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, FormInstance, ElMessageBox } from "element-plus";
import type { UploadRawFile } from "element-plus";
import { Category, Tag } from "@/api/interface";
import { getAllCategory } from "@/api/modules/category";
import { getAllTag } from "@/api/modules/tag";
import { addArticle, getArticleById, editArticle } from "@/api/modules/article";
import { uploadCoverImg } from "@/api/modules/upload";
export interface mdDataType {
  contentText: string
}
const router = useRouter();
const route = useRoute();

const categoryData = ref<Category.ResCategoryList[]>([])
const tagData = ref<Tag.ResTagList[]>([])
const mdText = ref("")
const isChange = ref(false)


const formData = reactive({
  title: "",
  categoryId: "",
  tagIds: [],
  contentText: "",
  coverImage: ""
})

const rules = reactive({
  title: [{ required: true, message: "请填写文章标题" }],
  coverImage: [{ required: true, message: "请上传文章封面" }],
  categoryId: [{ required: true, message: "请选择分类" }],
  tagIds: [{ required: true, message: "请选择标签" }],
});
const handleSave = (text: string, html: string) => {
  formData.contentText = text;
}

const beforeUpload = async (rawFile: UploadRawFile) => {
  // 大于2M 2097152字节
  if (rawFile.size > 2097152) {
    ElMessage.warning("图片大小不能大于2M!");
    return false;
  }
  if (!["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(rawFile.type)) {
    ElMessage.warning("图片格式只能为[.jpeg,.jpg,.png,.gif]");
    return false;
  }
  try {
    let coverFormData = new FormData();
    coverFormData.append("coverImage", rawFile);
    const result = await uploadCoverImg(coverFormData)
    if (Number(result.code) !== 200) {
      ElMessage.error(result.msg);
      return;
    }
    formData.coverImage = result.data as any;
    ElMessage.success(result.msg);
  } catch (error) {
    ElMessage.error("出错啦!");
  } finally {
    return false; // 防止调用action报404
  }
}

// 提交数据（新增/编辑）
const formRef = ref<FormInstance>();
const handleSubmit = () => {
  formRef.value!.validate(async valid => {
    if (!valid) return;
    if (!formData.contentText.trim()) {
      ElMessage.error({ message: "文章内容不能为空!", duration: 1000 });
    }
    let params: any;
    params = {
      ...formData,
      categoryId: Number(formData.categoryId)
    }
    if (route.params.tag === "edit") {
      params.id = route.query.id
    }
    const result = route.params.tag === "edit" ? (await editArticle(params)) : (await addArticle(params))

    if (Number(result.code) === 200) {
      ElMessage.success({ message: "文章发布成功!", duration: 1000 });
      router.push("/blog/articles")
    }
  });
};
// 用于判断是否有变化, 不做内容上的对比
const handleChnage = () => {
  isChange.value = true
}

let timer: any
const handleMdChnage = (text: string, html: string) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null
    isChange.value = true
    handleSave(text, html)
  }, 1000);
}
// 重置
const handleReset = () => {
  formRef.value!.resetFields();
  formRef.value!.clearValidate();
}
// 取消
const handleCancel = () => {
  if (isChange.value) {
    ElMessageBox.confirm(`是否要退出该页面?`, "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true,
    }).then(async () => {
      router.push("/blog/articles")
    });
  }
}

const editDataInit = async (id: number) => {
  const aricleRes = await getArticleById({ id })
  if (Number(aricleRes.code) === 200) {
    const { title, tags = [], category, contentText, coverImage } = aricleRes?.data as any;
    const tagIds = tags.map((item: any) => {
      return item.id
    })
    formData.title = title;
    formData.categoryId = category?.id;
    formData.tagIds = tagIds;
    formData.contentText = contentText;
    formData.coverImage = coverImage;
    mdText.value = contentText;
  } else {
    ElMessage.error({ message: "获取文章失败!", duration: 1000 });
  }
}

onMounted(() => {
  findAllCategory();
  findAllTag();
  if (route.params.tag === "edit" && route.query.id) {
    editDataInit(Number(route.query.id))
  }
})




const findAllCategory = async () => {
  const result = await getAllCategory();
  if (Number(result.code) === 200) {
    categoryData.value = result.data as Category.ResCategoryList[]
  }
}

const findAllTag = async () => {
  const result = await getAllTag();
  if (Number(result.code) === 200) {
    tagData.value = result.data as Tag.ResTagList[]
  }
}

</script>

<style lang="scss" scoped>
.article-page {
  padding: 10px;

  .header-area {
    display: flex;
    justify-content: center;

    .article-title {
      width: 330px;
    }
  }

  .md-content {
    height: calc(100vh - 70px);
  }
}
</style>