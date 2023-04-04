import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getAllTags } from "@service/tags";
// 获取标签
export const getAllTagsAction = createAsyncThunk(
  "tags/list",
  async (_, { dispatch, getState }) => {
    const result = await getAllTags();
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

const tagsSlice = createSlice({
  name: "tagsInfo",
  initialState,
  // 同步
  reducers: {
    // 重置数据
    resetArticleData: () => initialState,
  },
  // 异步操作
  extraReducers: (builder) => {
    builder.addCase(getAllTagsAction.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { resetArticleData } = tagsSlice.actions;

export const tagsReducer = tagsSlice.reducer;
