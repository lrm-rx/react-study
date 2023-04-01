import request from "./axios";

// 获取所有分类
export function getAllTags() {
  return request({
    url: "/tag/findalltag",
    params: {},
  });
}

// 查询标签下的文章
export function getTagBelowArticle(id) {
  return request({
    url: "/tag/tagbelowarticle",
    method: "POST",
    data: {
      id,
    },
  });
}
