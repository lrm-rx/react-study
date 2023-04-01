import request from "./axios";

// 获取所有分类
export function getAllCategories() {
  return request({
    url: "/category/findallcategory",
    params: {},
  });
}

// 查询分类下的文章
export function getCategoryBelowArticle(id) {
  return request({
    url: "/category/categorybelowarticle",
    method: "POST",
    data: {
      id,
    },
  });
}
