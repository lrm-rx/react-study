import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getCommentListByArticleId } from "@service/comment";
import { PAGE } from "@/common/contants";
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
      dispatch({
        type: "comment/setShowLoading",
        payload: result?.data?.commentList?.length ? true : false,
      });
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
  pageNum: PAGE.pageNum,
  pageSize: PAGE.pageSize,
  showLoading: true,
  relaodCommentsNum: 0,
  total: 0,
};

const commnetSlice = createSlice({
  name: "comment",
  initialState,
  // 同步
  reducers: {
    // 重置数据
    resetCommentData: () => initialState,
    // 重置分页
    resetPaging(state, action) {
      return {
        ...state,
        pageNum: PAGE.pageNum,
        pageSize: PAGE.pageSize,
      };
    },
    setShowLoading(state, action) {
      state.showLoading = action.payload;
    },
    reloadComments(state, action) {
      return {
        ...state,
        relaodCommentsNum: state.relaodCommentsNum + 1,
        page: {
          ...PAGE,
          pageNum: state.pageNum + 1,
        },
      };
    },
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

export const { resetCommentData, resetPaging } = commnetSlice.actions;

export const commentReducer = commnetSlice.reducer;
