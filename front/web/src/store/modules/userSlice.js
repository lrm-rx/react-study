import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  userLogin,
  userLogout,
  updatePassword,
  getUserInfo,
} from "@service/user";
import { resetArticleData } from "./articleSlice";
// 用户登录
export const userLoginAction = createAsyncThunk(
  "user/login",
  async (payload, { dispatch, getState }) => {
    const result = await userLogin(payload);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      dispatch({
        type: "userInfo/setLoginFlag",
        payload: true,
      });
      return result.data;
    }
    dispatch({
      type: "userInfo/setLoginFlag",
      payload: false,
    });
    message.error({
      content: result.msg,
      duration: 1,
    });
  }
);
// 获取用户信息
export const getUserInfoAction = createAsyncThunk(
  "user/info",
  async (id, { dispatch }) => {
    const result = await getUserInfo(id);
    if (Number(result.code) === 200) {
      return result.data;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  }
);

// 用户修改密码
export const userUpdatePasswordAction = createAsyncThunk(
  "user/updatepawwsord",
  async (payload, { dispatch }) => {
    const result = await updatePassword(payload);
    if (Number(result.code) === 200) {
      message.success({
        content: result.msg,
        duration: 1,
      });
      return;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  }
);

// 退出登录
export const userLogoutAction = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const result = await userLogout();
    if (Number(result.code) === 200) {
      dispatch({
        type: "userInfo/resetUserInfoData",
      });
      dispatch(resetArticleData());
    }
  }
);

const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    userId: 0,
    token: "",
    isLogin: false,
    basicInfo: null,
  },
  // 同步
  reducers: {
    // 设置已登录标记
    setLoginFlag: (state, action) => {
      state.isLogin = action.payload;
    },
    // 退出重置数据
    resetUserInfoData: (state, action) => {
      state.userId = 0;
      state.token = "";
      state.isLogin = false;
      state.basicInfo = null;
    },
    // 刷新基本信息
    refreshBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
    },
  },
  // 2.0官方不推荐使用对象的形式
  // extraReducers: {
  //   [getUserInfoAction.fulfilled](state, action) {
  //     console.log("state:", state, action);
  //   },
  // },
  // 异步操作
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.token = action.payload.token;
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.basicInfo = action.payload;
      });
  },
});

export const { setLoginFlag, refreshBasicInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
