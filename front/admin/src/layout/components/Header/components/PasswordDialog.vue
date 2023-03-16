<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
		<el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" status-icon>
			<el-form-item prop="oldPassword" label="原密码">
				<el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入原密码"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repeatNewPassword">
				<el-input type="password" v-model="ruleForm.repeatNewPassword" autocomplete="off"
					placeholder="请再次输入密码"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="resetForm()">重置</el-button>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="comfirmChangePassword">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from "vue";
import { updatePassword } from "@/api/modules/user";
import md5 from "js-md5";
import { ElNotification } from 'element-plus';
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config/config";
import { logoutApi } from "@/api/modules/login";

export interface formType {
	oldPassword: string
	newPassword: string
	repeatNewPassword: string
}
const router = useRouter()
const dialogVisible = ref(false);
const ruleFormRef = ref()

const ruleForm = reactive<formType>({
	oldPassword: "",
	newPassword: "",
	repeatNewPassword: ""
})

const validateOldPassword = (rule: any, value: any, callback: any) => {
	const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9!@#_.]{6,20}$/;
	if (value === '') {
		callback(new Error('请输入密码'))
	} else if (!reg.test(value.trim())) {
		callback(new Error('包含英文字母和数字或特殊字符(!@#_.)且长度应该在6-20之间!'))
	} else {
		callback()
	}
}

const validatePass = (rule: any, value: any, callback: any) => {
	const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9!@#_.]{6,20}$/;
	if (value === '') {
		callback(new Error('请输入密码'))
	} else if (!reg.test(value.trim())) {
		callback(new Error('包含英文字母和数字或特殊字符(!@#_.)且长度应该在6-20之间!'))
	} else {
		if (ruleForm.newPassword !== '') {
			ruleFormRef.value.validateField('repeatNewPassword')
		}
		callback()
	}
}
const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请再次输入密码'))
	} else if (value !== ruleForm.newPassword) {
		callback(new Error('两次输入密码不一致!'))
	} else {
		callback()
	}
}

const rules = {
	oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
	newPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
	repeatNewPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
}

const resetForm = () => {
	ruleFormRef.value.resetFields();
}
let timer: any;
// 确认修改密码
const comfirmChangePassword = async () => {
	const params = {
		oldPassword: md5(ruleForm.oldPassword),
		newPassword: md5(ruleForm.newPassword),
		repeatNewPassword: md5(ruleForm.repeatNewPassword)
	}
	try {
		const data = await updatePassword(params);
		console.log("修改密码返回:", data);
		if (Number(data?.code) === 200) {
			ElNotification({
				title: "温馨提示",
				message: "修改密码成功, 5秒后将跳转到登录页面！",
				type: "success",
				duration: 5000
			});
			timer = setTimeout(async () => {
				// 1.调用退出登录接口
				await logoutApi();
				router.push(LOGIN_URL);
			}, 5000);
		}
	} catch (error) {
		console.error(error);
	}
}

onUnmounted(() => {
	clearTimeout(timer)
})


// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
