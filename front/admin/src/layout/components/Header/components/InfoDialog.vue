<template>
	<el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
		<el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="ruleForm">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="用户名">
						<span>{{ ruleForm.username }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="邮箱">
						<span>{{ ruleForm.email }}</span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="角色" prop="role">
				<!-- <el-radio-group v-model="ruleForm.role" v-if="ruleForm.role === 1">
					<el-radio :label="1">管理员</el-radio>
					<el-radio :label="2">普通用户</el-radio>
				</el-radio-group> -->
				<span>{{ ruleForm.role === 1 ? "管理员" : "普通用户" }}</span>
			</el-form-item>
			<el-form-item label="用户头像" prop="avatar">
				<UploadImg v-model:imageUrl="ruleForm.avatar" width="135px" height="135px" :file-size="1" userId="2">
					<template #empty>
						<el-icon>
							<Avatar />
						</el-icon>
						<span>请上传头像</span>
					</template>
					<template #tip> 头像大小不能超过 1M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<span v-if="editVisible">{{ ruleForm.nickname }}</span>
				<el-input v-else v-model="ruleForm.nickname" placeholder="请填写昵称" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button v-if="editVisible" type="primary" @click="changeInfo">修改</el-button>
				<el-button v-else type="primary" @click="comfirm">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import UploadImg from "@/components/Upload/Img.vue";
import { GlobalStore } from "@/store";
import { editUser } from "@/api/modules/user";

const dialogVisible = ref(false);
const editVisible = ref(true);

const rules = reactive({
	avatar: [{ required: false, message: "请上传用户头像" }],
	nickname: [{ required: false, message: "请填写昵称" }],
});

const ruleForm = ref({
	id: "",
	avatar: "",
	nickname: "",
	username: "",
	email: "",
	role: 2
})

const globalStore = GlobalStore();

onMounted(() => {
	ruleForm.value = globalStore.userInfo;
})

const changeInfo = () => {
	editVisible.value = false;
}
const comfirm = async () => {
	const data = await editUser(ruleForm.value)
	dialogVisible.value = false
}
// openDialog
const openDialog = () => {
	dialogVisible.value = true;
	editVisible.value = true;
};

defineExpose({ openDialog });
</script>
