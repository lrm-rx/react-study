<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}标签`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.rowData"
      :disabled="drawerProps.isView">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="drawerProps.rowData!.name" placeholder="请填写标签名称" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
  name: [{ required: true, message: "请填写标签名称" }],
});

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData?: any;
  api?: (params: any) => Promise<any>;
  getTableList?: () => Promise<any>;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    await drawerProps.value.api!(drawerProps.value.rowData);
    ElMessage.success({ message: `${drawerProps.value.title}标签成功！` });
    drawerProps.value.getTableList!();
    drawerVisible.value = false;
  });
};

defineExpose({
  acceptParams
});
</script>
