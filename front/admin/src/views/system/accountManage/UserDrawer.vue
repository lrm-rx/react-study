<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.rowData">
      <el-form-item label="用户头像" prop="avatar" v-if="drawerProps.title !== '新增'">
        <UploadImg v-model:imageUrl="drawerProps.rowData!.avatar" width="135px" height="135px" :file-size="1"
          :userId="drawerProps.rowData!.id" :disabled="drawerProps.title !== '编辑'">
          <template #empty>
            <el-icon>
              <Avatar />
            </el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 1M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input :disabled="(drawerProps.title === '编辑' || drawerProps.title === '查看' || drawerProps.title === '')"
          v-model="drawerProps.rowData!.username" placeholder="请填写用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input :disabled="(drawerProps.title === '编辑' || drawerProps.title === '查看' || drawerProps.title === '')"
          v-model="drawerProps.rowData!.email" placeholder="请填写邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input :disabled="drawerProps.isView" v-model="drawerProps.rowData!.nickname" placeholder="请填写昵称"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio-group v-model="drawerProps.rowData!.role">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">普通用户</el-radio>
        </el-radio-group>
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
import UploadImg from "@/components/Upload/Img.vue";

const rules = reactive({
  avatar: [{ required: false, message: "请上传用户头像" }],
  username: [{ required: true, message: "请填写用户名" }],
  nickname: [{ required: false, message: "请填写昵称" }],
  email: [{ required: true, message: "请填写邮箱" }],
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
  if (!params.rowData!.role) {
    params.rowData.role = 2
  }
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    await drawerProps.value.api!(drawerProps.value.rowData);
    ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
    drawerProps.value.getTableList!();
    drawerVisible.value = false;
  });
};

defineExpose({
  acceptParams
});
</script>
