import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
// 获取文章列表
export const getArticleListAction = createAsyncThunk(
  "article/list",
  async (payload, { dispatch, getState }) => {}
);

const articleSlice = createSlice({
  name: "articleInfo",
  initialState: {
    list: [],
  },
  // 同步
  reducers: {
    // 重置数据
    resetArticleData: (state, action) => {
      state.list = []
    },
  },
  // 异步操作
  extraReducers: (builder) => {},
});

export const { resetArticleData } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
