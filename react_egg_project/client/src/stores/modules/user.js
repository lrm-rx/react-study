import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Toast } from "antd-mobile";
import { history } from "umi";
import { Http } from "@/utils";

// 用户信息
export const getUserDetailAction = createAsyncThunk(
  "/user/detail",
  async (payload, { dispatch }) => {
    const result = await Http({
      url: "/user/detail",
    });
    return result;
  }
);

// 用户注册
export const registerAction = createAsyncThunk(
  "/user/register",
  async (payload, { dispatch }) => {
    const result = await Http({
      url: "/user/register",
      body: payload,
    });
    if (result) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      Toast.show({
        icon: "success",
        content: "注册成功!",
        duration: 1000,
      });
    }
  }
);

// 编辑用户
export const editUserAction = createAsyncThunk(
  "/user/edit",
  async (payload, { dispatch }) => {
    const result = await Http({
      url: "/user/edit",
      body: payload,
    });
    if (result) {
      Toast.show({
        icon: "success",
        content: "编辑成功!",
        duration: 1000,
      });
      let timer;
      timer = setTimeout(() => {
        history.push("/user");
        timer = null;
      }, 1500);
    }
  }
);

// 用户登录
export const loginAction = createAsyncThunk(
  "/user/login",
  async (payload, { dispatch }) => {
    const result = await Http({
      url: "/user/login",
      body: payload,
    });
    if (!result) {
      Toast.show({
        icon: "fail",
        content: result.errMsg,
        duration: 1000,
      });
    }
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", result.username);
    return result;
  }
);

// 退出系统
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { dispatch }) => {
    const result = await Http({
      url: "/user/logout",
      body: payload,
    });
    localStorage.clear();
    Toast.show({
      icon: "success",
      content: "退出登录成功!",
      duration: 1000,
    });
    let timer;
    timer = setTimeout(() => {
      location.href = "/login?from=" + new Date().getTime();
      timer = null;
    }, 2000);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: {
      id: 1,
      username: "lrm",
      avatar:
        "https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg",
      tel: "756131502",
      sign: "admin",
    },
  },
  // 同步
  reducers: {},
  // 异步操作
  extraReducers: (builder) => {
    builder.addCase(
      getUserDetailAction.fulfilled,
      (state, { payload, type }) => {
        state.info = payload;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
