

<template>
  <div class="login-container">
    <div id="login-three-container"></div>
    <div class="login-plane">
      <div class="login-plane-container">
        <div class="login-plane-title">
          登录
          <img class="login-plane-title-line" src="@/assets/images/login/login_horizontal_line.png" alt="" />
        </div>
        <div class="login-plane-form">
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" @keyup.enter="handleLogin">
            <el-form-item prop="loginname">
              <el-input placeholder="用户名/邮箱" :prefix-icon="User" type="text" size="large" tabindex="1"
                v-model="loginForm.loginname" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" :prefix-icon="Lock" show-password type="password" size="large" tabindex="2"
                v-model="loginForm.password" />
            </el-form-item>
            <el-form-item prop="veritycode">
              <el-input v-model.trim="loginForm.veritycode" placeholder="验证码" :prefix-icon="Key" size="large" type="text"
                tabindex="3" maxlength="7">
                <template #append>
                  <div class="verity_code_svg" v-html="codeUrl" @click="createCode"></div>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button class="btn-login" :loading="loading" size="large" type="primary" @click.prevent="handleLogin"> 登 录
          </el-button>
        </div>
      </div>
    </div>
    <div class="login-ground"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { User, Lock, Key } from "@element-plus/icons-vue"
import { type FormInstance, FormRules } from "element-plus"
import { initThree } from "@/utils/render-three"
import { Login } from "@/api/interface/index";
import { loginVerityCode, loginApi } from "@/api/modules/login";
import { ElNotification } from "element-plus";
import { GlobalStore } from "@/store";
import { TabsStore } from "@/store/modules/tabs";
import { KeepAliveStore } from "@/store/modules/keepAlive";
import { getTimeState } from "@/utils/util";
import { HOME_URL } from "@/config/config";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import md5 from "js-md5";

const router = useRouter()
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();
const globalStore = GlobalStore();
const loginFormRef = ref<FormInstance | null>(null)

// 登录按钮
const loading = ref(false)
// 验证码
const codeUrl = ref()
// 登录表单数据

const loginForm = reactive<Login.ReqLoginForm>({
  loginname: "admin",
  password: "a123456",
  veritycode: ""
});
// 登录表单校验规则
const loginFormRules: FormRules = {
  loginname: [{ required: true, message: "请输入用户名/邮箱", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
  ],
  veritycode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
// 登录逻辑
const handleLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
      globalStore.setToken(data.token);
      globalStore.setUserId(data.id);
      // globalStore.setUserInfo(data)
      // 2.添加动态路由
      await initDynamicRouter();
      // 3.清空 tabs、keepAlive 保留的数据
      tabsStore.closeMultipleTab();
      keepAlive.setKeepAliveName();
      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录博客后台!!!",
        type: "success",
        duration: 3000
      });
    } catch (error) {
      throw new Error(error as any);
    } finally {
      loading.value = false;
    }
  })
}
// 创建验证码
const createCode = async () => {
  // 先清空验证码的输入
  loginForm.veritycode = "";
  // 获取验证码
  codeUrl.value = await loginVerityCode();
}
onMounted(() => {
  initThree();
  createCode();
})

</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;

  #login-three-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login-plane {
    position: absolute;
    z-index: 9999;
    width: 480px;
    height: 400px;
    background-image: url('@/assets/images/login/login_border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login-plane-container {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      background-color: #007eff2e;
      position: relative;

      .login-plane-title {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 35px;
        color: #fff;
        font-weight: 700;

        img {
          width: 50%;
        }

        .login-plane-title-line {
          width: 80%;
          position: absolute;
          bottom: 0;
        }
      }

      .login-plane-form {
        padding: 45px 55px;
        box-sizing: border-box;

        .verity_code_svg {
          width: 120px;
          height: 40px;
        }
      }
    }

    .btn-login {
      width: 100%;
      margin-top: 20px;
    }
  }

  .login-ground {
    position: absolute;
    z-index: 9998;
    width: 100%;
    height: 400px;
    background-image: url('@/assets/images/login/ground.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
<style lang="scss" scoped>
// element公用样式，如果有特别的再去重置
.login-plane {
  :deep(.el-input-group__append) {
    padding: 0;
  }

  :deep(.el-input__inner::-webkit-input-placeholder) {
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(.el-input__inner::-ms-input-placeholder) {
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(.el-input__inner::-moz-input-placeholder) {
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(.el-input__inner::-moz-input-placeholder) {
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(.el-input__wrapper) {
    background-color: transparent !important;
  }

  :deep(.el-input__inner) {
    background-color: transparent;
    color: #fff !important;
  }

  :deep(.el-input.is-disabled) {
    border: 1px solid rgba(64, 130, 250, 0.8);

    &:hover {
      border: 1px solid rgba(76, 106, 163, 0.8);
    }

    :deep(.el-input__wrapper) {
      background-color: transparent !important;
    }
  }


  :deep(.el-input-group__append),
  :deep(.el-input-group__prepend) {
    background-color: transparent;
    border-top: 1px solid #4082fa;
    border-left: 1px solid #4082fa;
    border-bottom: 1px solid #4082fa;
  }

  :deep(.el-button--primary) {
    background-color: #3870d6;
    color: #fff;
    border: 1px solid #3870d6;

    &:hover {
      background-color: #4082fa;
      color: #fff;
      border: 1px solid #3870d6;
    }
  }
}
</style>
