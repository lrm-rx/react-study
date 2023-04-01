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

// 通过id查找文章
export function getArticleDetail(id) {
  return request({
    url: "/article/detail",
    params: {
      id,
    },
  });
}

// 文章归档
export function getArchives() {
  return request({
    url: "/article/archives",
    params: {},
  });
}

// 通过关键词获取文章
export function getArticleByKeyword(keyword) {
  return request({
    url: "/article/keyword",
    method: "POST",
    data: {
      keyword,
    },
  });
}
