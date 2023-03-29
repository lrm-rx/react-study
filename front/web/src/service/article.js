import request from "./axios";

// 获取文章
export function getArticleList(data) {
  return request({
    url: "/article/list",
    method: "POST",
    data,
  });
}

// 写文章
export function createArticle(data) {
  return request({
    url: "/article/create",
    method: "POST",
    headers: {
      isAuth: true,
    },
    data,
  });
}

// 修改文章
export function updateArticle(id, data) {
  return request({
    url: `/article/update/${id}`,
    method: "POST",
    data,
  });
}
