import request from "./axios";

// 获取所有分类
export function getAllTags() {
  return request({
    url: "/tag/findalltag",
    params: {},
  });
}
