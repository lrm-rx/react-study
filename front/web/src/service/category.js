import request from "./axios";

// 获取所有分类
export function getAllCategories() {
  return request({
    url: "/category/findallcategory",
    params: {},
  });
}
