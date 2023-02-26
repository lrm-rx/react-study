import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "@/utils";
import { CommonEnum } from "@/enums";

// 房屋详情
export const getHouseDetailAction = createAsyncThunk(
  "/house/detail",
  async (payload, { dispatch }) => {
    const detail = await Http({
      url: "/house/detail",
      body: payload,
    });
    return detail;
  }
);

// 评论列表
export const getHouseCommentAction = createAsyncThunk(
  "/house/commnet",
  async (payload, { dispatch, getState }) => {
    const { comments, page } = getState().house;
    const lists = await Http({
      url: "/comments/lists",
      body: {
        ...payload,
        pageSize: page.pageSize,
        pageNum: page.pageNum,
      },
    });
    // dispatch({
    //   type: "house/getComments",
    //   payload: [...comments, ...lists],
    // });
    dispatch({
      type: "house/setShowLoading",
      payload: lists.length ? true : false,
    });

    return [...comments, ...lists];
  }
);

// 添加评论
export const getAddCommentAction = createAsyncThunk(
  "/house/addcommnet",
  async (payload, { dispatch, getState }) => {
    const result = await Http({
      url: "/comments/add",
      body: payload,
    });
    if (result) {
      dispatch({
        type: "house/resetData",
        payload: {},
      });
      // 手动触发刷新(todo: 为什么下拉可以自动触发getHouseCommentAction刷新?)
      dispatch(getHouseCommentAction());
    }
  }
);

const houseSlice = createSlice({
  name: "house",
  initialState: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    relaodCommentsNum: 0,
  },
  // 同步
  reducers: {
    // 刷新数据(暂不使用)
    refreshData: (state, action) => {
      state.list = action.payload;
    },
    // 获取评论
    // getComments(state, action) {
    //   return {
    //     ...state,
    //     comments: action.payload,
    //   };
    // },
    setShowLoading(state, action) {
      return {
        ...state,
        showLoading: action.payload,
      };
    },
    reloadComments(state, action) {
      return {
        ...state,
        relaodCommentsNum: state.relaodCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    resetData(state, action) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...action.payload,
      };
    },
  },
  // 异步操作
  extraReducers: (builder) => {
    builder
      .addCase(getHouseDetailAction.fulfilled, (state, { payload }) => {
        state.detail = payload;
      })
      .addCase(getHouseCommentAction.fulfilled, (state, { payload }) => {
        return {
          ...state,
          comments: payload,
        };
      });
  },
});

export const { refreshData, reloadComments, resetData } = houseSlice.actions;
export const houseReducer = houseSlice.reducer;
