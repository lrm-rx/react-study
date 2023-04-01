import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { getArticleByKeyword } from "@service/article";
import { getTagBelowArticle } from "@service/tags";
// 获取文章(通过关键词)
export const getAllArticlesAction = createAsyncThunk(
  "article/data",
  async (payload, { dispatch, getState }) => {
    const result = await getArticleByKeyword(payload);
    if (Number(result.code) === 200) {
      return result.data;
    }
    message.error({
      context: result.msg,
      duration: 1,
    });
  }
);
// 通过标签获取文章
export const getArticleByTagAction = createAsyncThunk(
  "article/databytag",
  async (payload, { dispatch, getState }) => {
    const result = await getTagBelowArticle(payload);
    if (Number(result.code) === 200) {
      return result.data[0]?.articles || [];
    }
    message.error({
      context: result.msg,
      duration: 1,
    });
  }
);

const globalSlice = createSlice({
  name: "globalInfo",
  initialState: {
    modal: {
      isSearchInput: true,
      open: false,
      searchContent: "",
      contentList: [],
    },
  },
  // 同步
  reducers: {
    openModal: (state, action) => {
      state.modal.isSearchInput = action.payload.isSearchInput;
      state.modal.open = action.payload.open;
    },
    closeModal: (state) => {
      state.modal.isSearchInput = true;
      state.modal.open = false;
      state.modal.contentList = [];
      state.modal.searchContent = "";
    },
    inputValChange: (state, action) => {
      state.modal.searchContent = action.payload;
    },
    setContentList: (state, action) => {
      console.log(" action.payload:", action.payload);
      state.modal.contentList = action.payload;
    },
  },
  // 异步操作
  extraReducers: (builder) => {
    builder
      .addCase(getAllArticlesAction.fulfilled, (state, action) => {
        state.modal.contentList = action.payload;
      })
      .addCase(getArticleByTagAction.fulfilled, (state, action) => {
        state.modal.contentList = action.payload;
      });
  },
});

export const { openModal, closeModal, inputValChange, setContentList } =
  globalSlice.actions;

export const globalReducer = globalSlice.reducer;
