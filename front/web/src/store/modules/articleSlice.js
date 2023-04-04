import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
// 获取文章列表
export const getArticleListAction = createAsyncThunk(
  "article/list",
  async (payload, { dispatch, getState }) => {}
);

const initialState = {
  list: [],
  detail: {},
};
const articleSlice = createSlice({
  name: "articleInfo",
  initialState,
  // 同步
  reducers: {
    // 重置数据
    resetArticleData: () => initialState,
    setArticleDetail(state, action) {
      state.detail = action.payload;
    },
  },
  // 异步操作
  extraReducers: (builder) => {},
});

export const { resetArticleData, setArticleDetail } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
