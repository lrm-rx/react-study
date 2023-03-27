import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "@service/user";
// 用户登录
export const userLoginAction = createAsyncThunk(
  "user/login",
  async (payload, { dispatch, getState }) => {
    const result = await userLogin(payload);
    console.log("result:", result);
  }
);
// 获取用户信息
export const getUserInfoAction = createAsyncThunk(
  "todos/get",
  async (_, { dispatch }) => {
    return null;
  }
);

const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    uData: [],
  },
  // 同步和异步操作
  reducers: {
    // 刷新数据
    refreshData: (state, action) => {
      state.todoList = action.payload;
    },
  },
  extraReducers: {
    [getUserInfoAction.fulfilled](state, action) {
      console.log("state:", state, action);
    },
  },
});

export const { refreshData } = userSlice.actions;

export const userReducer = userSlice.reducer;
