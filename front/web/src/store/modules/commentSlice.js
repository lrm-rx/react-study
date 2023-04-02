import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getCommentListByArticleId } from "@service/comment";
// 通过文章id获取评论
export const getCommentListByArticleIdAction = createAsyncThunk(
  "comment/list",
  async (payload, { dispatch, getState }) => {
    const { pageNum, pageSize } = getState().comment;
    const data = {
      ...payload,
      pageNum,
      pageSize,
    };
    const result = await getCommentListByArticleId(data);
    if (Number(result.code) === 200) {
      return result.data;
    }
    message.error({
      context: result.msg,
      duration: 1,
    });
  }
);

const initialState = {
  list: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
};

const commnetSlice = createSlice({
  name: "comment",
  initialState,
  // 同步
  reducers: {
    // 重置数据
    resetCommentData: () => initialState,
  },
  // 异步操作
  extraReducers: (builder) => {
    builder.addCase(
      getCommentListByArticleIdAction.fulfilled,
      (state, action) => {
        state.list = action.payload.commentList || [];
        state.total = action.payload.total;
      }
    );
  },
});

export const { resetCommentData } = commnetSlice.actions;

export const commentReducer = commnetSlice.reducer;
