import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { userLogin, getUserInfo } from "@service/user";
// 用户登录
export const userLoginAction = createAsyncThunk(
  "user/login",
  async (payload, { dispatch, getState }) => {
    const result = await userLogin(payload);
    if (result.code === 200) {
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
    return await getUserInfo(id);
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
  },
  // 2.0官方不推荐使用对象的形式
  // extraReducers: {
  //   [getUserInfoAction.fulfilled](state, action) {
  //     console.log("state:", state, action);
  //   },
  // },
  // 异步操作
  extraReducers: (builder) => {
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.userId = action.payload.id;
      state.token = action.payload.token;
    });
  },
});

export const { setLoginFlag } = userSlice.actions;

export const userReducer = userSlice.reducer;
