import { Http } from "@/utils";

export default {
  state: {
    detail: {},
    comments: [],
  },
  // 同步
  reducers: {
    getDetail(state, payload) {
      return {
        ...state,
        detail: payload,
      };
    },
  },
  // 异步
  effects: {
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: "/house/detail",
        body: payload,
      });

      dispatch({
        type: "getDetail",
        payload: detail,
      });
    },
  },
};
