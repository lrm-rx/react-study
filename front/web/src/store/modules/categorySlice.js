import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getAllCategories } from "@service/category";
// 获取分类
export const getAllCategoriesAction = createAsyncThunk(
  "categories/list",
  async (_, { dispatch, getState }) => {
    const result = await getAllCategories();
    if (Number(result.code) === 200) {
      return result.data || [];
    }
    message.error({
      content: result.msg || "出错啦!",
      duration: 1,
    });
  }
);

const initialState = {
  list: [],
};

const categorySlice = createSlice({
  name: "categoryInfo",
  initialState,
  // 同步
  reducers: {
    // 重置数据
    resetArticleData: () => initialState,
  },
  // 异步操作
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { resetArticleData } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
